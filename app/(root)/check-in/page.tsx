import React from "react";
import Checkin from "@/components/views/Checkin";
import ToastTx from "@/components/shared/ToastTx";

const CheckInPage = () => {
  return (
    <div className="flex flex-col space-y-6 w-full min-h-screen items-center justify-center p-5 bg-meteor-stars bg-no-repeat bg-cover">
      <Checkin />
    </div>
  );
};

export default CheckInPage;
