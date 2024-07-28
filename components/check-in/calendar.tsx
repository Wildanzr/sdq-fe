"use client";

import { checkIn } from "@/web3/checkin";
import React from "react";

const Calendar = () => {
  const handleCheckIn = async () => {
    const res = await checkIn();
    console.log(res);
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-shadow bg-secondary rounded-lg h-32"
      >
        01
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        02
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        03
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        04
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        05
      </button>
      <button
        onClick={handleCheckIn}
        className="flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        06
      </button>
      <button
        onClick={handleCheckIn}
        className="col-span-3 flex items-center justify-center text-tertiary bg-secondary rounded-lg h-32"
      >
        07
      </button>
    </div>
  );
};

export default Calendar;
