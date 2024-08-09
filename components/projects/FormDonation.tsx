"use client";

import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { donateNative, donateToken, getAvailableTokens } from "@/web3/charity";
import { CHARITY_ADDRESS, tokenIcons } from "@/constants/common";
import Image from "next/image";
import { Address, formatUnits, parseEther } from "viem";
import { approveSpending, getTokenBalance, TokenBalance } from "@/web3/token";
import { useAccount, useBalance } from "wagmi";
import { Input } from "../ui/input";
import Loader from "../shared/Loader";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { getExplorerDetails } from "@/lib/utils";
import ToastTx from "../shared/ToastTx";
import useWaitForTxAction from "@/hooks/useWaitForTx";

const formSchema = z.object({
  name: z.string().max(100).optional(),
  message: z.string().max(100).optional(),
  token: z.string(),
  amount: z
    .string()
    .refine(
      (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
      {
        message: "Expected positive non-zero number, received a string",
      }
    ),
});

interface SelectedToken {
  label: string;
  address: Address;
  icon: string;
}

interface FormDonationProps {
  campaignId: number;
}

const FormDonation = ({ campaignId }: FormDonationProps) => {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<
    readonly [readonly `0x${string}`[], readonly string[]] | undefined
  >();
  const { address, chainId } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });
  const [walletBalance, setWalletBalance] = useState<TokenBalance[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [selected, setSelected] = useState<SelectedToken>({
    label: "native",
    address: "0x0",
    icon: "/icons/islamic.svg",
  });
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [state, setState] = useState<"approve" | "donate">("donate");
  const [refetch, setRefetch] = useState(true);
  const etherscan = getExplorerDetails(chainId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      message: "",
      name: "",
      token: "",
    },
  });

  const action = () => {
    if (txHash !== undefined) {
      toast({
        title: "Transaction Done",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={txHash}
          />
        ),
      });

      setTxHash(undefined);
      setDisabledButton(false);

      if (state === "approve") {
        setState("donate");
        setRefetch(true);
      } else {
        form.reset();
      }
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });

  const handleCreateCampaign = async (values: z.infer<typeof formSchema>) => {
    if (selected.label === "native") {
      handleDonateNative();
    } else {
      handleDonateToken();
    }
  };

  const handleDonateNative = async () => {
    setDisabledButton(true);
    try {
      const amount = parseEther(form.getValues("amount"));
      const txHash = await donateNative(
        campaignId,
        form.getValues("name")!,
        form.getValues("message")!,
        amount
      );
      setTxHash(txHash);
      toast({
        title: "Transaction submitted",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={txHash}
          />
        ),
      });
    } catch (error: any) {
      console.error("Error in handleDonateNative", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const handleDonateToken = async () => {
    setDisabledButton(true);
    // Check if allowance is 0
    const index = walletBalance.findIndex(
      (item) => item.address === selected.address
    );

    try {
      let txHash: Address | undefined = undefined;
      if (walletBalance[index].allowance === BigInt(0)) {
        // Approve Spending
        setState("approve");
        txHash = await approveSpending(selected.address);
        setTxHash(txHash);
        setTxHash(txHash);
        toast({
          title: "Transaction submitted",
          action: (
            <ToastTx
              explorerLink={etherscan.blockExplorers.default.url}
              explorerName={etherscan.blockExplorers.default.name}
              txHash={txHash}
            />
          ),
        });
      } else {
        const tokenDecimals = walletBalance[index].decimals;
        const tokenAmount = Number(form.getValues("amount"));
        const amount = BigInt(tokenAmount * 10 ** tokenDecimals);
        txHash = await donateToken(
          campaignId,
          form.getValues("name")!,
          form.getValues("message")!,
          amount,
          selected.address
        );
        setTxHash(txHash);
        toast({
          title: "Transaction submitted",
          action: (
            <ToastTx
              explorerLink={etherscan.blockExplorers.default.url}
              explorerName={etherscan.blockExplorers.default.name}
              txHash={txHash}
            />
          ),
        });
      }
    } catch (error: any) {
      console.error("Error in handleCreateCampaign", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const res = await getAvailableTokens();
      setTokens(res);
      let tokenBalances: TokenBalance[] = [];
      for (const item of res[0]) {
        const balance = await getTokenBalance(item, address!, CHARITY_ADDRESS);
        tokenBalances.push(balance);
      }
      setWalletBalance(tokenBalances);
      setRefetch(false);
    };

    if (refetch) {
      fetchTokens();
    }
  }, [refetch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateCampaign)}
        className="flex flex-col space-y-3 w-full h-full"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Crypto
                <span className="pl-1 text-red-500">*</span>
              </FormLabel>
              <div className="flex flex-row space-x-3">
                <FormControl className="w-full">
                  <Input
                    type="number"
                    max={
                      selected.label === "native"
                        ? Number(
                            // @ts-ignore
                            formatUnits(data?.value, data?.decimals)
                          )
                        : Number(
                            formatUnits(
                              walletBalance.find(
                                (item) => item.address === selected.address
                              )!.value,
                              walletBalance.find(
                                (item) => item.address === selected.address
                              )!.decimals
                            )
                          )
                    }
                    className="bg-primary-100 border border-primary-90 text-neutral-base"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <Select
                  value={selected.label}
                  onValueChange={(value) => {
                    const index = tokens?.[1].indexOf(value)!;
                    const address = tokens?.[0][index] || "0x0";
                    // @ts-ignore
                    const icon =
                      tokenIcons.find((item) => item.label === value)?.icon ||
                      "/icons/islamic.svg";
                    setSelected({ label: value, address, icon });
                  }}
                >
                  <SelectTrigger className="w-1/6 bg-primary-100 border border-primary-90 text-neutral-base">
                    <SelectValue>
                      <Image
                        src={selected.icon}
                        width={20}
                        height={20}
                        alt={selected.label}
                      />
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">ISLM</SelectItem>
                    {tokens?.[0].map((address, index) => (
                      <SelectItem key={index} value={tokens?.[1][index]}>
                        {tokens?.[1][index]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selected.label === "native" ? (
                isLoading || data === undefined ? (
                  <Loader size="20" speed="1.75" color="white" />
                ) : (
                  <span className="text-neutral-base m-body-link">
                    {Number(formatUnits(data.value, 18))} {data.symbol}
                  </span>
                )
              ) : (
                <span className="text-neutral-base m-body-link">
                  {Number(
                    formatUnits(
                      walletBalance.find(
                        (item) => item.address === selected.address
                      )!.value,
                      walletBalance.find(
                        (item) => item.address === selected.address
                      )!.decimals
                    )
                  )}{" "}
                  {
                    walletBalance.find(
                      (item) => item.address === selected.address
                    )!.symbol
                  }
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="Anonymous"
                  maxLength={50}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="I hope this ..."
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={disabledButton}
          className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl"
        >
          <p>
            {selected.label === "native"
              ? "Donate Now"
              : walletBalance.find((item) => item.address === selected.address)!
                  .allowance === BigInt(0)
              ? "Approve"
              : "Donate Now"}
          </p>
          {disabledButton && <Loader size="20" speed="1.75" color="white" />}
        </Button>
      </form>
    </Form>
  );
};

export default FormDonation;
