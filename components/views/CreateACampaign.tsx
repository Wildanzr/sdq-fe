"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";

const CreateACampaign = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full">
          <p>This is Create Campaign </p>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default CreateACampaign;
