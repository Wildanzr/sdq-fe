import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import ManageCampaignDetails from "@/components/views/ManageCampaignDetails";
import { navigations } from "@/constants/common";
import React from "react";

const ManageCampaignPage = ({ params, searchParams }: URLProps) => {
  console.log("params", params);
  console.log("searchParams", searchParams);

  const path = {
    label: params.id,
    href: `/my-campaigns/${params.id}`,
  };
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[4], path]} />
      </div>
      <div className="flex flex-col space-y-6 p-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <ManageCampaignDetails />
      </div>
    </div>
  );
};

export default ManageCampaignPage;
