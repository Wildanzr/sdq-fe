"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains:
      process.env.NEXT_PUBLIC_NETWORK === "mainnet"
        ? [haqqMainnet]
        : [haqqTestedge2],
    transports:
      process.env.NEXT_PUBLIC_NETWORK === "mainnet"
        ? { [haqqMainnet.id]: http("https://api.haqq.xyz") }
        : { [haqqTestedge2.id]: http("https://api.testedge2.haqq.xyz") },

    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "SDQ",
    appDescription:
      "SDQ is a decentralized social network for charity and social good.",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: ChildrenProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
