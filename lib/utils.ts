import { CHAIN_EXPLORERS } from "@/constants/common";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAlreadyClaimed = (lastClaimed: bigint) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const lastClaimedDay = Math.trunc((Number(lastClaimed) * 1000) / oneDay);
  const now = Math.trunc(Date.now() / oneDay);
  return lastClaimedDay === now;
};

export const getExplorerDetails = (chainId: number | undefined) => {
  if (chainId === undefined) return CHAIN_EXPLORERS[0];
  const blockExplorer = CHAIN_EXPLORERS.find((item) => {
    if (item.id === chainId) return item;
  });

  return blockExplorer || CHAIN_EXPLORERS[0];
};

export const formatterUSD = new Intl.NumberFormat("default", {
  style: "currency",
  currency: "USD",
});

export const truncateAddress = (address: string | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};