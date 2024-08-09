import { readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { Address } from "viem";
import { tokenAbi } from "@/constants/abis/token";
import { CHARITY_ADDRESS } from "@/constants/common";
import { writeContract } from "@wagmi/core";

export interface TokenBalance {
  value: bigint;
  decimals: number;
  symbol: string;
  allowance: bigint;
  address: Address;
}

// Write Contracts
export const approveSpending = async (token: Address) => {
  const maxAmount = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  try {
    const approve = await writeContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "approve",
      args: [CHARITY_ADDRESS, maxAmount]
    });

    return approve;
  } catch (error) {
    console.error("Error in approveSpending", error);
    throw error;
  }
};

// Read Contracts
export const getTokenBalance = async (token: Address, owner: Address, spender: Address) => {
  try {
    const balance = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "balanceOf",
      args: [owner]
    })

    const decimal = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "decimals",
      args: []
    })

    const symbol = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "symbol",
      args: []
    })

    const allowance = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "allowance",
      args: [owner, spender]
    })

    const result = await Promise.all([balance, decimal, symbol, allowance]);

    return {
      value: result[0],
      decimals: result[1],
      symbol: result[2],
      allowance: result[3],
      address: token
    } as TokenBalance;
  } catch (error) {
    console.error("Error in getMyStats", error);
    throw error;
  }
};
