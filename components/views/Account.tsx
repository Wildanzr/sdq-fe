"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import WalletInfo from "@/components/account/WalletInfo";
import ParticipatedList from "../account/ParticipatedList";
import NFTList from "../account/NFTList";

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
          <NFTList />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default Account;
