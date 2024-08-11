import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import MyCampaign from "@/components/views/MyCampaign";
import { navigations } from "@/constants/common";
import { getAddressFromRegex } from "@/lib/utils";
import console from "console";
import { headers } from "next/headers";
import React from "react";

const MyCampaignPage = () => {
  const cookie = headers().get("cookie");
  const stringified = JSON.stringify(cookie);
  const address = getAddressFromRegex(stringified);
  console.log("Address", address);
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[4]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <MyCampaign />
      </div>
    </div>
  );
};

export default MyCampaignPage;
