import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Item = () => {
  return (
    <Card className="w-full bg-secondary-100/50 rounded-2xl border-primary-90">
      <CardHeader className="flex flex-col space-y-3 p-4">
        <div className="flex relative h-60 w-full">
          <Image
            src={"/images/campaign-1.jpg"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-3xl"
            alt="Campaign 1"
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-brand-50 bg-primary-50/30 p-2 m-body-link rounded-xl">
            Housing Assistance
          </p>
          <p className="text-neutral-base m-label">Last update: 2 months ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 w-full h-full">
          <h2 className="text-neutral-base m-heading">
            Building Homes for the Needy
          </h2>

          <p className="text-neutral-base m-body-small line-clamp-3">
            Help provide safe and secure housing for families in need. Your
            donation will support the construction of homes for those without
            shelter
          </p>
          <div className="w-full h-2 bg-primary-90 rounded-xl">
            <div className="w-2/5 h-full bg-brand-60 rounded-xl"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start justify-start space-y-1">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-neutral-base m-subheading">$4,000</p>
          <p className="text-neutral-base m-subheading">40%</p>
        </div>
        <p className="text-neutral-70 m-body-small">raised of $10,000</p>
      </CardFooter>
    </Card>
  );
};

export default Item;
