"use client";

import { getExplorerDetails } from "@/lib/utils";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { useToast } from "../ui/use-toast";

const WalletInfo = () => {
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { data } = useBalance();
  const etherscan = getExplorerDetails(chainId);

  console.log("data", data);

  // create a function to truncate the address
  const truncateAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    copy(address || "");
    toast({
      title: "Address copied to clipboard",
      duration: 1000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full h-full bg-primary-100 rounded-t-none rounded-[60px] p-5 border-2 border-t-0 border-primary-base ">
      <div className="flex flex-col space-y-1">
        <h2 className="text-neutral-base m-heading text-center">My Account</h2>
        <p className="text-neutral-base m-body-link text-center">
          {etherscan.name}
        </p>
      </div>
      <Image
        src="/images/abstract.png"
        width={100}
        height={100}
        alt="wallet"
        className="rounded-full border-4 border-primary-70"
      />
      <p
        onClick={copyAddress}
        className="text-secondary-100 cursor-pointer py-1 px-3 rounded-2xl bg-brand-50 m-body-base text-center"
      >
        {truncateAddress(address)}
      </p>
    </div>
  );
};

export default WalletInfo;
