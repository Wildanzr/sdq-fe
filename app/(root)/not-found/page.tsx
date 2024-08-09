import { DonateDialog } from "@/components/projects/DonateDialog";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-neutral-base m-heading">Not Found</h2>
      <DonateDialog />
    </div>
  );
};

export default NotFoundPage;
