"use client";

import { useWalletStore } from "@/store/wallet";
import { checkIn, getMyStats } from "@/web3/checkin";
import React, { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

const Calendar = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address } = useAccount();

  const handleCheckIn = async () => {
    const res = await checkIn();
    console.log(res);
  };

  useEffect(() => {
    const getStats = async (address: Address | undefined) => {
      const result = await getMyStats(address);
      console.log(result);
    };

    if (isConnected) {
      getStats(address);
    } else {
      console.log("No need to check");
    }
  }, [address, isConnected]);
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-shadow bg-secondary rounded-lg h-32"
      >
        01
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        02
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        03
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        04
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        05
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        06
      </button>
      <button
        onClick={handleCheckIn}
        className="col-span-3 flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        07
      </button>
    </div>
  );
};

export default Calendar;
