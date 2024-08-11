import { Address } from "viem";

// Global.d.ts
// Use for global type declaration

export { };

declare global {
  interface ChildrenProps {
    children: React.ReactNode;
  }

  interface URLProps {
    params: { id: string };
    searchParams: { [key: string]: string | undefined };
  }

  interface CampaignDetails {
    owner: `0x${string}`;
    title: string;
    details: string;
    target: bigint;
    donators: bigint;
    created: bigint;
    updated: bigint;
    paused: boolean;
    claimed: boolean;
  }

  interface CampaignDonations {
    address: `0x${string}`[];
    values: bigint[];
  }

  interface AvailableTokens {
    address: `0x${string}`[];
    coinIds: string[];
    decimals: number[];
    price: number[];
    icon: string[];
  }

  interface MinimumCampaign {
    id: number;
    owner: Address
    title: string;
    images: string[];
    description: string;
    target: number;
    raised: number;
    updated: Date;
  }

  interface MaximumCampaign {
    id: number;
    owner: Address
    title: string;
    images: string[];
    description: string;
    details: string;
    target: number;
    raised: number;
    updated: Date;
  }

  interface TokenIcon {
    label: string;
    image: string;
  }

  interface TokenBalance {
    value: bigint;
    allowance: bigint;
    ticker: string;
  }
}
