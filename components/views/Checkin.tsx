"use client";

import { checkInProducts } from "@/constants/common";
import Calendar from "@/components/check-in/Calendar";
import React from "react";
import Blocker from "../shared/Blocker";
import Product from "../shared/Product";
import { useWalletStore } from "@/store/wallet";

const Checkin = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));

  return (
    <>
      {isConnected ? (
        <>
          <Calendar />
          <h2 className="text-neutral-base m-title-page">
            Benefit of Check In
          </h2>
          <div className="flex flex-col space-y-3 w-full h-full items-center justify-center">
            {checkInProducts.map((item, idx) => (
              <Product
                key={idx}
                description={item.description}
                image={item.image}
                label={item.label}
              />
            ))}
          </div>
        </>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default Checkin;
