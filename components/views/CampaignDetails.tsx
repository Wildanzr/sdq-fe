"use client";

import React, { useEffect, useState } from "react";
import {
  getAvailableTokens,
  getCampaignDetails,
  getCampaignDonations,
  getCampaignDonationsLog,
  CampaignDetails as TypeCampaignDetails,
} from "@/web3/charity";
import { useRouter } from "next/navigation";
import { getFromIPFS, IPFSResponse } from "@/actions/ipfs";
import { Button } from "../ui/button";
import Creator from "../projects/Creator";
import Donors, { Donator } from "../campaigns/Donors";
import ItemDetails from "../projects/ItemDetails";
import Overview from "../campaigns/Overview";
import { PiShareFatThin } from "react-icons/pi";
import { DonateDialog } from "../projects/DonateDialog";
import { useAccount } from "wagmi";
import { getExplorerDetails } from "@/lib/utils";
import { tokenIcons } from "@/constants/common";
import { formatUnits } from "viem";

interface CampaignDetailsProps {
  campaignId: number;
}

const CampaignDetails = ({ campaignId }: CampaignDetailsProps) => {
  const router = useRouter();
  const { chainId, address } = useAccount();
  const [details, setDetails] = useState<IPFSResponse | undefined>();
  const [campaign, setCampaign] = useState<TypeCampaignDetails | undefined>();
  const [donators, setDonators] = useState<Donator[]>([]);
  const etherscan = getExplorerDetails(chainId);
  const [tokens, setTokens] = useState<
    readonly [readonly `0x${string}`[], readonly string[]] | undefined
  >();
  const [donations, setDonations] = useState<
    readonly [readonly `0x${string}`[], readonly bigint[]] | undefined
  >();

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await getAvailableTokens();
      setTokens(res);
    };

    const fetchCampaign = async () => {
      try {
        const [cam, don, tor, _] = await Promise.all([
          getCampaignDetails(campaignId),
          getCampaignDonations(campaignId),
          getCampaignDonationsLog(campaignId),
          fetchTokens(),
        ]);
        const result = await getFromIPFS(cam.details);
        setCampaign(cam);
        setDetails(result);
        setDonations(don);
        const donators: Donator[] = [];

        console.log("Don", don);

        for (const item of tor) {
          const icon = tokenIcons.find((i) => i.address === item.token)?.icon!;
          const decimal = tokenIcons.find((i) => i.address === item.token)
            ?.decimals!;

          donators.push({
            token: icon,
            amount: formatUnits(BigInt(item.amount.toString()), decimal),
            message: item.message,
            name: item.name,
            tx: `${etherscan.blockExplorers.default.url}/tx/${item.tx}`,
          });
        }
        setDonators(donators);
      } catch (error) {
        console.error("Error in fetchCampaign", error);
        router.push("/not-found");
      }
    };

    fetchCampaign();
  }, [campaignId]);
  return (
    <>
      {campaign && details && (
        <div className="flex space-y-5 flex-col w-full h-full items-start justify-start py-3">
          <ItemDetails
            description={details.description}
            imageSources={details.images}
            target={Number(campaign.target)}
            title={campaign.title}
            raised={100}
          />
          <div className="flex flex-row space-x-5 w-full h-full">
            <Button className="border border-brand-base rounded-lg bg-primary-100">
              <PiShareFatThin className="text-brand-base" />
            </Button>
            <DonateDialog campaignId={campaignId} title={campaign.title} />
          </div>
          <Creator address={campaign.owner} verified={true} />
          <Overview content={details.details} />
          <Donors donators={donators} />
        </div>
      )}
    </>
  );
};

export default CampaignDetails;
