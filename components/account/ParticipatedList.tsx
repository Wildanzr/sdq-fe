import React from "react";
import { Button } from "../ui/button";

const ParticipatedList = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <h2 className="text-neutral-base m-subheading">Participated Campaigns</h2>
      <div className="flex flex-col space-y-3 items-center justify-center">
        <p className="w-full text-neutral-base m-body-base text-center bg-primary-100 p-4 rounded-xl shadow-[0px_-2px_2px_0px_#13AE75]">
          You haven&apos;t participated in any campaign yet
        </p>
        <Button className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-50/20 border-2 border-brand-70 rounded-xl">
          <p className="m-body-base">Explore Campaign</p>
        </Button>
      </div>
    </div>
  );
};

export default ParticipatedList;
