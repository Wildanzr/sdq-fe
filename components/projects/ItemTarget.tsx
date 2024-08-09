import { getCampaignDetails } from "@/web3/charity";
import React from "react";

interface ItemTargetProps {
  campaignId: number;
}

const ItemTarget = async ({ campaignId }: ItemTargetProps) => {
  const result = await getCampaignDetails(campaignId);
  console.log("Result", result);
  return <div>ItemTarget</div>;
};

export default ItemTarget;
