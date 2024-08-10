"use client";

import { CampaignCreatedEvent, getCampaigns } from "@/web3/charity";
import React, { useEffect, useState } from "react";
import Item from "../projects/Item";

const HomeProjects = () => {
  const [campaigns, setCampaigns] = useState<
    CampaignCreatedEvent[] | undefined
  >();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await getCampaigns();
      setCampaigns(res);
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      {campaigns?.map((item, idx) => (
        <Item campaignId={Number(item.campaignId)} key={idx} />
      ))}
    </>
  );
};

export default HomeProjects;
