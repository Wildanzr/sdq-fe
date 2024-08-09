import { readContract, writeContract } from "@wagmi/core";
import { charityAbi } from "@/constants/abis/charity";
import { CHARITY_ADDRESS } from "@/constants/common";
import { config } from "@/config/wagmi";
import { Address } from "viem";

export interface GetMyStatsResponse {
  consecutiveDays: number;
  isBlacklisted: boolean;
  lastClaimed: bigint;
  totalClaimed: bigint;
}

export const createCampaign = async (
  title: string,
  details: string,
  target: string,
) => {
  console.log("Title", title);
  console.log("Details", details);
  console.log("Target", target);
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "createCampaign",
      args: [title, details, BigInt(target)],
    });

    return result;
  } catch (error) {
    console.error("Error in createCampaign", error);
    throw error;
  }
}

// Read Contracts
