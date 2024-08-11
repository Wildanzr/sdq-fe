"use server";

import { charityAbi } from "@/constants/abis/charity";
import { CHARITY_ADDRESS, tokenIcon } from "@/constants/common";
import { readContract } from "@wagmi/core";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";
import { createConfig, http } from "wagmi";
import { Address } from "viem";
import { getFromIPFS, IPFSResponse } from "./ipfs";
import { getCoinLatestPrice } from "./coingecko";
import { countTotalRaised } from "@/lib/utils";

interface CampaignDonations {
  address: `0x${string}`[];
  values: bigint[];
}

interface CampaignDetails {
  owner: `0x${string}`;
  title: string;
  details: string;
  target: bigint;
  donators: bigint;
  created: bigint;
  updated: bigint;
  paused: boolean;
  claimed: boolean;
}

const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";
const serverConfig = createConfig({
  chains: NETWORK === "mainnet" ? [haqqMainnet] : [haqqTestedge2],
  transports: {
    [haqqMainnet.id]: http("https://rpc.eth.haqq.network"),
    [haqqTestedge2.id]: http("https://rpc.eth.testedge2.haqq.network"),
  },
})

export const getNumberOfCampaigns = async () => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "numberOfCampaigns",
      args: [],
    });

    return result;
  } catch (error) {
    console.error("Error in getNumberOfCampaigns", error);
    throw false;
  }
}

export const getCampaignDetails = async (id: number) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDetails",
      args: [id],
    });

    return result as CampaignDetails;
  } catch (error) {
    console.error("Error in getCampaignDetails", error);
    return false;
  }
}

export const getCampaignDonations = async (id: number) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDonations",
      args: [id]
    })
    const donations: CampaignDonations = {
      address: result[0] as `0x${string}`[],
      values: result[1] as bigint[]
    }

    return donations;
  } catch (error) {
    console.error("Error in getCampaignDonations", error);
    return false;
  }
}

export const getAvailableTokens = async () => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getAvailableTokens",
      args: [],
    });
    const availableTokens: AvailableTokens = {
      address: result[0] as `0x${string}`[],
      coinIds: result[1] as string[],
      decimals: result[2] as number[],
      price: [],
      icon: result[1].map(label => tokenIcon.find(item => item.label === label)?.image || tokenIcon[0].image),
    }

    const prices: number[] = [];
    const latestPrice = await Promise.all(availableTokens.coinIds.map((item) => getCoinLatestPrice(item)));
    latestPrice.forEach((price, idx) => {
      prices.push(price);
    });
    availableTokens.price = prices;

    return availableTokens;
  } catch (error) {
    console.error("Error in getAvailableTokens", error);
    return false;
  }
}

export const paginateCampaigns = async (page: number, limit: number) => {
  try {
    const numberOfCampaigns = await getNumberOfCampaigns();
    const campaigns: MinimumCampaign[] = [];
    const end = page * limit;
    const start = page * limit - limit === 0
      ? 1
      : page * limit - limit;

    const tokens = await getAvailableTokens() as AvailableTokens;
    const islm = await getCoinLatestPrice("islamic-coin");
    tokens.decimals.push(18);
    tokens.price.push(islm);
    for (let i = start; i < end; i++) {
      if (i > numberOfCampaigns) {
        break;
      }
      const [details, donations] = await Promise.all([
        getCampaignDetails(i),
        getCampaignDonations(i),
      ]) as [CampaignDetails, CampaignDonations];
      if (!details || !donations) {
        break;
      }

      const ipfs = await getFromIPFS(details.details);
      campaigns.push({
        id: i,
        owner: details.owner,
        description: ipfs.description,
        images: ipfs.images,
        title: ipfs.title,
        target: Number(details.target),
        raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
        updated: new Date(Number(details.updated) * 1000),
      })
    }

    return { campaigns, numberOfCampaigns };
  } catch (error) {
    console.error("Error in paginateCampaigns", error);
    throw error;
  }
}

export const getMinimumCampaignDetails = async (id: number) => {
  try {
    let [details, donations] = await Promise.all([
      getCampaignDetails(id),
      getCampaignDonations(id),
    ]) as [CampaignDetails, CampaignDonations];

    if (!details || !donations) {
      return false;
    }
    const [ipfs, tokens, islm] = await Promise.all([
      getFromIPFS(details.details),
      getAvailableTokens(),
      getCoinLatestPrice("islamic-coin"),
    ]) as [IPFSResponse, AvailableTokens, number];

    tokens.decimals.push(18);
    tokens.price.push(islm);

    const campaign: MinimumCampaign = {
      id,
      owner: details.owner,
      description: ipfs.description,
      images: ipfs.images,
      title: ipfs.title,
      raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
      target: Number(details.target),
      updated: new Date(Number(details.updated) * 1000),
    }

    return campaign;
  } catch (error) {
    console.error("Error in getMinimumCampaignDetails", error);
    return false;
  }
}

export const getMaximumCampaignDetails = async (id: number) => {
  try {
    let [details, donations] = await Promise.all([
      getCampaignDetails(id),
      getCampaignDonations(id),
    ]) as [CampaignDetails, CampaignDonations];

    if (!details || !donations) {
      return false;
    }
    const [ipfs, tokens, islm] = await Promise.all([
      getFromIPFS(details.details),
      getAvailableTokens(),
      getCoinLatestPrice("islamic-coin"),
    ]) as [IPFSResponse, AvailableTokens, number];

    tokens.decimals.push(18);
    tokens.price.push(islm);

    const campaign: MaximumCampaign = {
      id,
      owner: details.owner,
      description: ipfs.description,
      details: ipfs.details,
      images: ipfs.images,
      title: ipfs.title,
      raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
      target: Number(details.target),
      updated: new Date(Number(details.updated) * 1000),
    }

    return campaign;
  } catch (error) {
    console.error("Error in getMaximumCapaignDetails", error);
    return false;
  }
}