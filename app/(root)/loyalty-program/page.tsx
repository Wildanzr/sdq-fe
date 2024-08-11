import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import LoyaltyProgram from "@/components/views/LoyaltyProgram";
import { navigations } from "@/constants/common";
import React from "react";

const LoyaltyProgramPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[2]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <LoyaltyProgram />
      </div>
    </div>
  );
};

export default LoyaltyProgramPage;
