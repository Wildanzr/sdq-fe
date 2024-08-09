"use client";

import React, { useEffect, useState } from "react";
import {
  getCampaignDetails,
  CampaignDetails as TypeCampaignDetails,
} from "@/web3/charity";
import { useRouter } from "next/navigation";
import Item from "../projects/Item";
import { getFromIPFS, IPFSResponse } from "@/actions/ipfs";
import { Button } from "../ui/button";
import { useWalletStore } from "@/store/wallet";

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

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await getCampaignDetails(campaignId);
        const result = await getFromIPFS(res.details);
        setCampaign(res);
        setDetails(result);
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
          <Item campaignId={campaignId} />
          <Button
            disabled={!isConnected}
            className="flex w-full flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl p-2"
          >
            <p className="m-body-base">Donate Now</p>

            <h2 className="text-neutral-base m-title-page text-start">
              Creator
            </h2>
          </Button>
        </div>
      )}
    </>
  );
};

export default CampaignDetails;
