import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAlreadyClaimed = (lastClaimed: bigint) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const lastClaimedDay = Math.trunc((Number(lastClaimed) * 1000) / oneDay);
  const now = Math.trunc(Date.now() / oneDay);
  console.log("Last Claimed", lastClaimedDay);
  console.log("Now", now);
  return lastClaimedDay === now;
};
