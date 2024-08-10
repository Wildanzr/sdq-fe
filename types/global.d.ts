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

  interface MinimumCampaign {
    id: number;
    owner: Address
    title: string;
    images: string[];
    description: string;
    target: number;
    raised: number;
  }
}
