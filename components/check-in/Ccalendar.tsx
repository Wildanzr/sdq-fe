"use client";

import { useWalletStore } from "@/store/wallet";
import { checkIn, getMyStats } from "@/web3/checkin";
import React, { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import Item from "./Iitem";
import { checkInLists } from "@/constants/common";
import { Button } from "../ui/button";
import emoji from "react-easy-emoji";

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
          currentDay={3}
          day={item.day}
          image={item.image}
          onClick={handleCheckIn}
          className={item.day === 7 ? "col-span-3" : ""}
        />
      ))}

      <Button
        onClick={handleCheckIn}
        className="flex h-16 flex-row items-center justify-center col-span-3 bg-gradient-to-r from-brand-60 to-primary-80 rounded-xl"
      >
        <p className="flex flex-row items-center justify-center space-x-2 font-manrope text-2xl text-neutral-base font-semibold">
          Claim {emoji("✨")}
        </p>
      </Button>
    </div>
  );
};

export default Calendar;
