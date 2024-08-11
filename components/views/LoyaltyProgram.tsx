"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Footer from "../shared/Footer";

const LoyaltyProgram = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full">
          <p>This is Loyalty Program </p>
          <Footer />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default LoyaltyProgram;
