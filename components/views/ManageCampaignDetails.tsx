"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Item from "../campaigns/Item";
import Overview from "../campaigns/Overview";
import Donator from "../campaigns/Donator";

interface ManageCampaignDetailsProps {
  campaign: MaximumCampaign;
  availableTokens: AvailableTokens;
}

const ManageCampaignDetails = ({
  campaign,
  availableTokens,
}: ManageCampaignDetailsProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-6 p-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
          <Item
            campaign={campaign}
            showCreator={false}
            customLink={`/my-campaigns/${campaign.id}`}
          />
          <div className="flex flex-row space-x-5 w-full h-full"></div>
          <Overview content={campaign.details} />
          <Donator id={campaign.id} availableTokens={availableTokens} />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default ManageCampaignDetails;
