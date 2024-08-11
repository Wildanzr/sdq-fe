"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Message from "../projects/Message";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { getCampaignDonationsLog } from "@/web3/charity";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../shared/Loader";
import { getExplorer } from "@/lib/utils";

interface Donator {
  token: string;
  amount: string;
  name: string;
  message: string;
  tx: string;
}

interface DonatorProps {
  id: number;
}

const Donator = ({ id }: DonatorProps) => {
  const [donators, setDonators] = useState<Donator[] | undefined>([]);
  const etherscan = getExplorer();
  const fetchDonators = useCallback(async () => {
    const result = await getCampaignDonationsLog(id);
    console.log("Donators", result);

    const donators: Donator[] = [];
    for (const item of result) {
      donators.push({
        token: "/icons/atom.svg",
        amount: "10",
        message: item.message,
        name: item.name,
        tx: `${etherscan.url}/tx/${item.tx}`,
      });
    }
    setDonators(donators);
  }, [etherscan.url, id]);

  useEffect(() => {
    if (id) {
      fetchDonators();
    }
  }, [fetchDonators, id]);

  return (
    <div className="flex flex-col w-full h-full">
      {donators === undefined ? (
        <div className="flex items-center justify-center w-full ">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full text-neutral-base">
          <h2 className="m-title-page text-start">Donors</h2>
          <Table className="overflow-scroll">
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Tx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donators.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <p className="m-body-base text-neutral-base">
                      Be the first to donate 💖
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                donators.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      <Image
                        src={item.token}
                        width={20}
                        height={20}
                        alt="Token"
                      />
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.message && (
                        <Message from={item.name} message={item.message} />
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <Link href={item.tx} target="_blank">
                        <FaExternalLinkAlt
                          className="text-neutral-base cursor-pointer"
                          size={20}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Donator;
