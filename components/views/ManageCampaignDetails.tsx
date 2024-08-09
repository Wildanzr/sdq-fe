"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Item from "../projects/Item";
import { Button } from "../ui/button";

const ManageCampaignDetails = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-5 w-full h-full min-h-screen items-start justify-start">
          {/* <Item /> */}
          <div className="flex flex-row space-x-3 items-center justify-center w-full h-full">
            <Button
              onClick={() => {}}
              className="bg-primary-100 border border-primary-90 text-neutral-base w-full h-full"
            >
              Pause Campaign
            </Button>
            <Button
              onClick={() => {}}
              className="bg-primary-100 border border-primary-90 text-neutral-base w-full h-full"
            >
              Edit Campaign
            </Button>
          </div>
          <Button
            onClick={() => {}}
            className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl w-full h-full"
          >
            Edit Campaign
          </Button>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default ManageCampaignDetails;
