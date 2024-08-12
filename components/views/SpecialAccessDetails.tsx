"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import AccessItem from "@/components/special-access/AccessItem";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { CHARITY_ADDRESS, SHODAQO_ADDRESS } from "@/constants/common";
import { useCallback, useEffect, useState } from "react";
import { getTokenBalance } from "@/web3/token";
import Image from "next/image";
import { formatUnits } from "viem";
import { useToast } from "../ui/use-toast";
import { claimSpecialAccess } from "@/actions/access";
import { useRouter } from "next/navigation";

interface SpecialAccessDetailsProps {
  access: Access;
}

const SpecialAccessDetails = ({ access }: SpecialAccessDetailsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address } = useAccount();
  const [disabledButton, setDisabledButton] = useState(false);
  const [walletBalance, setWalletBalance] = useState<
    TokenBalance | undefined
  >();

  const handleClaim = async () => {
    setDisabledButton(true);
    try {
      const res = (await claimSpecialAccess(access._id, address!)) as string;
      console.log("res", JSON.parse(res));
      toast({
        title: "Transaction successful",
        description: "You have successfully claimed the special access",
        variant: "default",
      });

      setDisabledButton(false);

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error: any) {
      console.error("Error claiming special access", error);
      setDisabledButton(false);

      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const fetchWalletBalance = useCallback(async () => {
    const balance = await getTokenBalance(
      SHODAQO_ADDRESS,
      address!,
      CHARITY_ADDRESS
    );
    console.log("Balance", balance);
    setWalletBalance(balance);
  }, [address]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address]);
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full items-start justify-start min-h-screen">
          {walletBalance !== undefined && (
            <div className="flex  w-full items-center justify-end text-neutral-base ">
              <div className="flex flex-row space-x-2 bg-primary-80/80 py-1 px-2 rounded-lg">
                <Image
                  src="/coins/twemoji_coin-1.svg"
                  alt="Coin"
                  width={20}
                  height={20}
                />
                <p className="font-medium mb-0">
                  {formatUnits(walletBalance.value, 18)}
                </p>
              </div>
            </div>
          )}

          <AccessItem
            id={access._id}
            image={access.image}
            price={access.price}
            sold={access.sold}
            total={access.total}
            title={access.title}
            className="rounded-none border-0"
          />
          <div className="flex flex-col w-full h-full items-start justify-start p-5 space-y-5">
            <h1 className="m-heading text-neutral-base">{access.title}</h1>
            <p className="text-neutral-base m-body-small">{access.details}</p>

            {address !== undefined && access.claimers.includes(address) && (
              <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
                <h1 className="m-heading text-neutral-base">Content</h1>
                <p className="text-neutral-base m-body-small">
                  {access.privateContent}
                </p>
              </div>
            )}
            {walletBalance !== undefined && address !== undefined && (
              <Button
                onClick={handleClaim}
                disabled={
                  Number(formatUnits(walletBalance.value, 18)) < access.price ||
                  disabledButton ||
                  access.claimers.includes(address)
                }
                className="flex w-full flex-row items-center space-x-2 justify-center col-span-3 bg-gradient-to-r from-brand-60 to-secondary-base rounded-lg"
              >
                {disabledButton
                  ? "Processing..."
                  : access.claimers.includes(address)
                  ? "Claimed"
                  : Number(formatUnits(walletBalance.value, 18)) < access.price
                  ? "Insufficient Balance"
                  : `Claim for ${access.price} SDQ`}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default SpecialAccessDetails;
