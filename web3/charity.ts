import { readContract, writeContract } from "@wagmi/core";
import { charityAbi } from "@/constants/abis/charity";
import { CHARITY_ADDRESS, CHARITY_FIRST_BLOCK } from "@/constants/common";
import { config } from "@/config/wagmi";
import { Address } from "viem";
import { publicClient } from "@/config/viem";

export interface GetMyStatsResponse {
  consecutiveDays: number;
  isBlacklisted: boolean;
  lastClaimed: bigint;
  totalClaimed: bigint;
}

export interface CampaignCreatedEvent {
  campaignId: bigint;
  description: string;
  details: string;
  owner: Address;
  timestamp: bigint;
  title: string;
}

export interface CampaignDetails {
  owner: Address;
  title: string;
  details: string;
  target: bigint;
  donators: bigint;
  created: bigint;
  updated: bigint;
  paused: boolean;
  claimed: boolean;
}

export const createCampaign = async (
  title: string,
  description: string,
  details: string,
  target: string,
) => {
  console.log("Title", title);
  console.log("Details", details);
  console.log("Target", target);
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "createCampaign",
      args: [title, description, details, BigInt(target)],
    });

    return result;
  } catch (error) {
    console.error("Error in createCampaign", error);
    throw error;
  }
}

// Read Contracts
export const getCampaigns = async () => {
  try {
    const campaigns: CampaignCreatedEvent[] = [];
    const res = await publicClient.getContractEvents({
      address: CHARITY_ADDRESS,
      abi: charityAbi,
      eventName: "CampaignCreated",
      fromBlock: CHARITY_FIRST_BLOCK
    })

    for (const event of res) {
      campaigns.push({
        campaignId: event.args.campaignId!,
        description: event.args.description!,
        details: event.args.details!,
        owner: event.args.owner!,
        timestamp: event.args.timestamp!,
        title: event.args.title!,
      });
    }

    return campaigns;
  } catch (error) {
    console.error("Error in getMyCampaigns", error);
    throw error;
  }
}

export const getMyCampaigns = async (address: Address | undefined) => {
  try {
    const campaigns: CampaignCreatedEvent[] = [];
    const res = await publicClient.getContractEvents({
      address: CHARITY_ADDRESS,
      abi: charityAbi,
      eventName: "CampaignCreated",
      args: {
        owner: address
      },
      fromBlock: CHARITY_FIRST_BLOCK
    })

    for (const event of res) {
      campaigns.push({
        campaignId: event.args.campaignId!,
        description: event.args.description!,
        details: event.args.details!,
        owner: event.args.owner!,
        timestamp: event.args.timestamp!,
        title: event.args.title!,
      });
    }

    return campaigns;
  } catch (error) {
    console.error("Error in getMyCampaigns", error);
    throw error;
  }
}

export const getCampaignDetailsLog = async (address: Address | undefined, campaignId: number) => {
  try {
    const campaigns: CampaignCreatedEvent[] = [];
    const res = await publicClient.getContractEvents({
      address: CHARITY_ADDRESS,
      abi: charityAbi,
      eventName: "CampaignCreated",
      args: {
        owner: address,

      },
      fromBlock: CHARITY_FIRST_BLOCK
    })

    for (const event of res) {
      campaigns.push({
        campaignId: event.args.campaignId!,
        description: event.args.description!,
        details: event.args.details!,
        owner: event.args.owner!,
        timestamp: event.args.timestamp!,
        title: event.args.title!,
      });
    }

    return campaigns;
  } catch (error) {
    console.error("Error in getMyCampaigns", error);
    throw error;
  }
}


export const getCampaignDetails = async (campaignId: number) => {
  try {
    const result = await readContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDetails",
      args: [campaignId],
    });

    return result;
  } catch (error) {
    console.error("Error in getCampaignDetails", error);
    throw error;
  }
}

export const getCampaignDonations = async (campaignId: number) => {
  try {
    const result = await readContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDonations",
      args: [campaignId],
    });

    return result;
  } catch (error) {
    console.error("Error in getCampaignDonations", error);
    throw error;
  }
}


