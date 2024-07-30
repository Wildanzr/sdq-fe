"use client";

import { useWalletStore } from "@/store/wallet";
import { checkIn, getMyStats } from "@/web3/checkin";
import React, { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import Item from "./item";
import { checkInLists } from "@/constants/common";

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
      {checkInLists.map((item, idx) => (
        <Item
          key={idx}
          amount={item.amount}
          day={item.day}
          image="/images/coin.png"
          onClick={handleCheckIn}
          className={item.className}
        />
      ))}
    </div>
  );
};

export default Calendar;
