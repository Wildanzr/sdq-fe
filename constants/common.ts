import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";

interface Navigation {
  label: string;
  href: string;
}

interface CheckIn {
  day: number;
  amount: number;
  image: string;
}

interface Product {
  image: string;
  label: string;
  description: string;
}

export const CHECK_IN_ADDRESS = "0xC19c451acEBD8761329F3f8BAFCd6B3f1fd304fb";
export const SHODAQO_ADDRESS = "0xe13DFf45ee9bB1A02Ae15632e4FF971819954b86";

const navigations: Navigation[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Check In",
    href: "/check-in",
  },
  {
    label: "Loyalty Program",
    href: "/loyalty-program",
  },
  {
    label: "Account",
    href: "/account",
  },
];

const userColors = {
  primary: "#86EE60",
  secondary: "#2E6E65",
  tertiary: "#F4F7ED",
  shadow: "#2B3752",
};

const checkInLists: CheckIn[] = [
  {
    amount: 1.25,
    day: 1,
    image: "/images/coin-1.png",
  },
  {
    amount: 1.5,
    day: 2,
    image: "/images/coin-2.png",
  },
  {
    amount: 2,
    day: 3,
    image: "/images/coin-3.png",
  },
  {
    amount: 3,
    day: 4,
    image: "/images/coin-4.png",
  },
  {
    amount: 5,
    day: 5,
    image: "/images/coin-5.png",
  },
  {
    amount: 7,
    day: 6,
    image: "/images/coin-6.png",
  },
  {
    amount: 10,
    day: 7,
    image: "/images/coin-7.png",
  },
];

const checkInProducts: Product[] = [
  {
    image: "/images/earn.png",
    label: "Earn",
    description: "Earn Coins Every Day!",
  },
  {
    image: "/images/collect.png",
    label: "Collect",
    description: "Collect Coins and Exchange for Attractive Rewards",
  },
  {
    image: "/images/level.png",
    label: "Level",
    description: "Level Up and Unlock Exclusive Surprises",
  },
  {
    image: "/images/bonus.png",
    label: "Earn",
    description: "Earn Bonus Coins for Consecutive Check-ins",
  },
  {
    image: "/images/reward.png",
    label: "Earn",
    description: "Don't Miss Daily Check-ins for Special Rewards!",
  },
];

const homeProducts: Product[] = [
  {
    image: "/images/earn.png",
    label: "Earn",
    description: "Transparent transactions, trackable contributions.",
  },
  {
    image: "/images/collect.png",
    label: "Collect",
    description: "Secure, tamper-proof blockchain system.",
  },
  {
    image: "/images/level.png",
    label: "Level",
    description: "Shariah-aligned ethical giving.",
  },
  {
    image: "/images/bonus.png",
    label: "Earn",
    description: "Global reach through Web3 technology.",
  },
  {
    image: "/images/reward.png",
    label: "Earn",
    description: "User-friendly, seamless donation experience.",
  },
];

const CHAIN_EXPLORERS = [haqqMainnet, haqqTestedge2];

export {
  navigations,
  userColors,
  checkInLists,
  checkInProducts,
  homeProducts,
  CHAIN_EXPLORERS,
};
