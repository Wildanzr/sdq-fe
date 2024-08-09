"use client";

import React, { useEffect, useState } from "react";
import {
  getCampaignDetails,
  getCampaignDonations,
  CampaignDetails as TypeCampaignDetails,
} from "@/web3/charity";
import { useRouter } from "next/navigation";
import { getFromIPFS, IPFSResponse } from "@/actions/ipfs";
import { Button } from "../ui/button";
import { useWalletStore } from "@/store/wallet";
import Creator from "../projects/Creator";
import Donors from "../projects/Donors";
import ItemDetails from "../projects/ItemDetails";
import Overview from "../projects/Overview";
import { PiShareFatThin } from "react-icons/pi";
import { DonateDialog } from "../projects/DonateDialog";

interface CampaignDetailsProps {
  campaignId: number;
}

const CampaignDetails = ({ campaignId }: CampaignDetailsProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const router = useRouter();
  const [details, setDetails] = useState<IPFSResponse | undefined>();
  const [campaign, setCampaign] = useState<TypeCampaignDetails | undefined>();
  const [donations, setDonations] = useState<
    readonly [readonly `0x${string}`[], readonly bigint[]] | undefined
  >();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const [cam, don] = await Promise.all([
          getCampaignDetails(campaignId),
          getCampaignDonations(campaignId),
        ]);
        const result = await getFromIPFS(cam.details);
        setCampaign(cam);
        setDetails(result);
        setDonations(don);
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
          <Donors />
        </div>
      )}
    </>
  );
};

export default CampaignDetails;
