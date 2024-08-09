"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ImageCarousel from "./ImageCarousel";
import {
  CampaignDetails,
  getCampaignDetails,
  getCampaignDonations,
} from "@/web3/charity";
import { Separator } from "../ui/separator";
import { formatterUSD } from "@/lib/utils";
import Link from "next/link";
import { getFromIPFS, IPFSResponse } from "@/actions/ipfs";

interface ItemProps {
  campaignId: number;
}

const Item = ({ campaignId }: ItemProps) => {
  const [campaign, setCampaign] = useState<CampaignDetails | undefined>();
  const [details, setDetails] = useState<IPFSResponse | undefined>();
  const [donations, setDonations] = useState<
    readonly [readonly `0x${string}`[], readonly bigint[]] | undefined
  >();

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const [cam, don] = await Promise.all([
          getCampaignDetails(Number(campaignId)),
          getCampaignDonations(Number(campaignId)),
        ]);
        const ipfsDetails = await getFromIPFS(cam.details);
        setCampaign(cam);
        setDonations(don);
        setDetails(ipfsDetails);
      } catch (error) {
        console.error("Error in fetchCampaignDetails", error);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);
  return (
    <Card className="w-full bg-secondary-100/50 rounded-2xl border-primary-90">
      <CardHeader className="flex flex-col space-y-3 p-4 w-full">
        <div className="flex relative h-60 w-full">
          <ImageCarousel imageSources={details?.images} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 w-full h-full">
          <Link
            href={`/campaigns/${campaignId}?title=${campaign?.title}`}
            className="text-brand-60 m-heading"
          >
            {campaign ? campaign.title : ""}
          </Link>

          <Separator className="my-4 bg-primary-90" />

          <p className="text-neutral-base m-body-small line-clamp-3">
            {details?.description}
          </p>
          <div className="w-full h-2 bg-primary-90 rounded-xl">
            <div className="w-2/5 h-full bg-brand-60 rounded-xl" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start justify-start space-y-1">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-neutral-base m-subheading">
            {campaign ? Number(campaign.donators) : 0}
          </p>
          <p className="text-neutral-base m-subheading">40%</p>
        </div>
        <p className="text-neutral-70 m-body-small">
          raised of {formatterUSD.format(Number(campaign?.target))}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Item;
