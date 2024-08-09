"use client";

import { getExplorerDetails, truncateAddress } from "@/lib/utils";
import React from "react";
import { MdOutlineVerified } from "react-icons/md";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";

interface CreatorProps {
  address: string;
  verified: boolean;
}

const Creator = ({ address, verified }: CreatorProps) => {
  const { chainId } = useAccount();
  const etherscan = getExplorerDetails(chainId);
  return (
    <div className="flex flex-col w-full h-full">
      <h2 className="text-neutral-base m-title-page text-start">Creator</h2>
      <Link
        target="_blank"
        href={`${etherscan.blockExplorers.default.url}/address/${address}`}
        className="flex flex-row space-x-3 w-full h-full items-center justify-start"
      >
        <Image
          src="/images/abstract.png"
          width={50}
          height={50}
          alt="wallet"
          className="rounded-full border border-primary-70"
        />
        <div className="flex flex-row space-x-3 items-center justify-center">
          <p className="text-neutral-base m-body-base ">
            {truncateAddress("0x6eC7D0B2c30f7C4C6E5f9d8Fce81C2E2a9D9d5E4")}
          </p>
          {verified && <MdOutlineVerified className="text-brand-base" />}
        </div>
      </Link>
    </div>
  );
};

export default Creator;
