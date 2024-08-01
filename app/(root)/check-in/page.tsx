import React from "react";
import Checkin from "@/components/views/Checkin";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { navigations } from "@/constants/common";

const CheckInPage = () => {
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[1]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Checkin />
      </div>
    </div>
  );
};

export default CheckInPage;
