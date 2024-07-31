"use client";

import { useWalletStore } from "@/store/wallet";
import { checkIn, getMyStats } from "@/web3/checkin";
import type { GetMyStatsResponse } from "@/web3/checkin";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import Item from "./Iitem";
import { checkInLists } from "@/constants/common";
import { Button } from "../ui/button";
import emoji from "react-easy-emoji";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAlreadyClaimed } from "@/lib/utils";

const Calendar = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address, status } = useAccount();
  const [stats, setStats] = useState<GetMyStatsResponse | null>(null);

  const handleCheckIn = async () => {
    try {
      const res = await checkIn();
      console.log("Check In", res);
    } catch (error) {
      console.error("Error in handleCheckIn", error);
      throw error;
    }
  };

  useEffect(() => {
    const getStats = async (address: Address | undefined) => {
      const result = await getMyStats(address);
      setStats(result);
      console.log("Result", result);
    };

    if (isConnected && status === "connected") {
      getStats(address);
    } else {
      setStats(null);
      console.log("No need to check");
    }
  }, [address, isConnected, status]);
  return (
    <>
      {stats !== null && (
        <Card className="w-full bg-secondary-100/50 rounded-xl border-primary-90">
          <CardHeader>
            <CardTitle className="w-full text-center text-neutral-base m-title-page">
              Daily Check In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-5 p-2">
              {checkInLists.map((item, idx) => (
                <Item
                  key={idx}
                  amount={item.amount}
                  currentDay={stats.consecutiveDays + 1}
                  day={item.day}
                  image={item.image}
                  className={item.day === 7 ? "col-span-3" : ""}
                />
              ))}

              <Button
                onClick={handleCheckIn}
                disabled={isAlreadyClaimed(stats.lastClaimed)}
                className="flex h-16 flex-row items-center space-x-2 justify-center col-span-3 bg-gradient-to-r from-brand-60 to-primary-80 rounded-3xl"
              >
                <p className="m-body-strong text-neutral-base">
                  {isAlreadyClaimed(stats.lastClaimed) ? "Claimed " : `Claim `}
                </p>
                <p className="m-body-strong text-neutral-base">
                  {isAlreadyClaimed(stats.lastClaimed)
                    ? emoji("🔐")
                    : emoji("✨")}
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Calendar;
