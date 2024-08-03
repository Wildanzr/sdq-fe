import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import Account from "@/components/views/Account";
import { navigations } from "@/constants/common";
import React from "react";

const AccountPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[3]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Account />
      </div>
    </div>
  );
};

export default AccountPage;
