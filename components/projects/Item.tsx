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

interface ItemProps {
  campaignId: number;
  description: string;
}

const Item = ({ campaignId, description }: ItemProps) => {
  const [campaign, setCampaign] = useState<CampaignDetails | undefined>();
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
        setCampaign(cam);
        setDonations(don);
        console.log("Campaign", cam);
        console.log("Donations", don);
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
          <ImageCarousel />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 w-full h-full">
          <h2 className="text-neutral-base m-heading">
            {campaign ? campaign.title : ""}
          </h2>

          <Separator className="my-4 bg-primary-90" />

          <p className="text-neutral-base m-body-small line-clamp-3">
            {description}
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
