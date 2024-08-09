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

export const CHECK_IN_ADDRESS = "0xB6dD6284Ff5b7A9d28994a5C12309e5E6d956c21";
export const SHODAQO_ADDRESS = "0x040EAdcaF7450609358047b7eF3Bef37E45D39D5";
export const CHARITY_ADDRESS = "0xb37bfD19Cf90804D5483848Ce59e3cd0C96E47E9";
export const CHARITY_FIRST_BLOCK = BigInt(10558853);

export const navigations: Navigation[] = [
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
    label: "Create a Campaign",
    href: "/create-a-campaign",
  },
  {
    label: "My Campaigns",
    href: "/my-campaigns",
  },
  {
    label: "Account",
    href: "/account",
  },
];

export const userColors = {
  primary: "#86EE60",
  secondary: "#2E6E65",
  tertiary: "#F4F7ED",
  shadow: "#2B3752",
};

export const checkInLists: CheckIn[] = [
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

export const checkInProducts: Product[] = [
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

export const homeProducts: Product[] = [
  {
    image: "/icons/home-1.svg",
    label: "Earn",
    description: "Transparent transactions, trackable contributions.",
  },
  {
    image: "/icons/home-2.svg",
    label: "Collect",
    description: "Secure, tamper-proof blockchain system.",
  },
  {
    image: "/icons/home-3.svg",
    label: "Level",
    description: "Shariah-aligned ethical giving.",
  },
  {
    image: "/icons/home-4.svg",
    label: "Earn",
    description: "Global reach through Web3 technology.",
  },
  {
    image: "/icons/home-5.svg",
    label: "Earn",
    description: "User-friendly, seamless donation experience.",
  },
];

export const CHAIN_EXPLORERS = [haqqMainnet, haqqTestedge2];

export const campaignStatus = [
  "All",
  "Active",
  "Finished",
]

export const campaignFilter = [
  "Last Updated",
  "Most Popular",
  "Most Raised",
]

export const tokenIcons = [
  {
    label: "native",
    icon: "/icons/islamic.svg",
  },
  {
    label: "usdc",
    icon: "/icons/usdc.svg",
  },
  {
    label: "tether",
    icon: "/icons/usdt.svg",
  },
  {
    label: "bridged-tether-axelar",
    icon: "/icons/usdt.svg",
  },
  {
    label: "bridged-usd-coin-axelar",
    icon: "/icons/usdc.svg",
  },
]