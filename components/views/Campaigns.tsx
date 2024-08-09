"use client";

import React, { useEffect, useState } from "react";
import CampaignFilter, { QueryFilterProps } from "../shared/CampaignFilter";
import { campaignFilter, campaignStatus } from "@/constants/common";
import { CampaignCreatedEvent, getCampaigns } from "@/web3/charity";
import Item from "../projects/Item";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<
    CampaignCreatedEvent[] | undefined
  >();
  const [queryFilter, setQueryFilter] = useState<QueryFilterProps>({
    query: "",
    filter: campaignFilter[0],
    status: campaignStatus[0],
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await getCampaigns();
      setCampaigns(res);
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex space-y-5 flex-col w-full h-full items-center justify-start py-3">
      <h2 className="text-neutral-base m-title-page text-center">
        Featured Campaigns
      </h2>
      <CampaignFilter values={queryFilter} setValues={setQueryFilter} />
      {campaigns?.map((item, idx) => (
        <Item campaignId={Number(item.campaignId)} key={idx} />
      ))}
    </div>
  );
};

export default Campaigns;
