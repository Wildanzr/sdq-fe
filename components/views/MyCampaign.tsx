"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import CampaignFilter, { QueryFilterProps } from "../shared/CampaignFilter";
import { useState } from "react";
import { campaignStatus, campaignFilter } from "@/constants/common";
import Item from "../projects/Item";

const MyCampaign = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));

  const [queryFilter, setQueryFilter] = useState<QueryFilterProps>({
    query: "",
    filter: campaignFilter[0],
    status: campaignStatus[0],
  });
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-5 w-full h-full min-h-screen items-start justify-start">
          <h2 className="m-heading text-neutral-base py-3 mb-0">
            My Campaigns
          </h2>
          <CampaignFilter values={queryFilter} setValues={setQueryFilter} />
          <Item />
          <Item />
          <Item />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default MyCampaign;
