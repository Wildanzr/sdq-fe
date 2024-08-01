"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import WalletInfo from "@/components/account/WalletInfo";
import ParticipatedList from "../account/ParticipatedList";

const Account = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full">
          <WalletInfo />
          <ParticipatedList />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default Account;
