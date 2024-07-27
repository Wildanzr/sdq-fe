"use client";

import React from "react";
import { createThirdwebClient } from "thirdweb";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "b648be5f88b4c0cafb37ca096539abe4",
});

const ConnectWallet = () => {
  const { connect, isConnecting, error } = useConnect();
  return (
    <button
      onClick={() =>
        connect(async () => {
          const wallet = createWallet("network.haqq"); // pass the wallet id

          // open WalletConnect modal so user can scan the QR code and connect
          await wallet.connect({
            client,
            walletConnect: { showQrModal: true },
          });

          console.log("Connected to wallet", wallet);
          // return the wallet to set it as active wallet
          return wallet;
        })
      }
    >
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  );
};

export default ConnectWallet;
