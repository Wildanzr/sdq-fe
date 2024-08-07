"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import FormCampaign from "../create-a-campaign/FormCampaign";

const CreateACampaign = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full min-h-screen items-start justify-start">
          <FormCampaign />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default CreateACampaign;
