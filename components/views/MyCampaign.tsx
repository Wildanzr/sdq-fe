"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import { useCallback, useEffect, useState } from "react";
import Item from "../projects/Item";
import { CampaignCreatedEvent, getMyCampaigns } from "@/web3/charity";
import { useAccount } from "wagmi";

const MyCampaign = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address } = useAccount();
  const [campaigns, setCampaigns] = useState<CampaignCreatedEvent[]>([]);

  const fetchMyCampaigns = useCallback(async () => {
    try {
      const res = await getMyCampaigns(address);
      setCampaigns(res);
      console.log("My Campaigns", res);
    } catch (error) {
      console.error("Error in fetchMyCampaigns", error);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected) {
      fetchMyCampaigns();
    }
  }, [fetchMyCampaigns, isConnected]);
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-5 w-full h-full min-h-screen items-start justify-start">
          <h2 className="m-heading text-neutral-base py-3 mb-0">
            My Campaigns
          </h2>
          {campaigns.length === 0 ? (
            <p>
              No campaigns found. Create a campaign to get started with your
            </p>
          ) : (
            campaigns.map((item, idx) => (
              <Item campaignId={Number(item.campaignId)} key={idx} />
            ))
          )}
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default MyCampaign;
