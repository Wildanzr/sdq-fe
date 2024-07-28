import { readContract, writeContract } from "@wagmi/core";
import { checkinAbi } from "@/constants/abis/checkin";
import { CHECK_IN_ADDRESS } from "@/constants/common";
import { config } from "@/config/wagmi";

// Write Contract
export const checkIn = async () => {
  try {
    const result = await writeContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "checkIn",
    });

    return result;
  } catch (error) {
    console.error("Error in checkIn", error);
    throw error;
  }
};
