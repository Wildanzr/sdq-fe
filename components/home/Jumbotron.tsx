import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Jumbotron = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-meteor-stars">
      <div className="flex flex-col w-full h-full space-y-5 p-5">
        <Image
          src="/images/charity-crypto.png"
          width={300}
          height={300}
          alt="Charity Crypto"
          className="absolute top-32 -right-12"
        />

        <h1 className="text-neutral-base m-title-hero z-10">
          Empowering Ethical Donations Through Islamic Values and Web3
          Technology
        </h1>
        <p className="text-neutral-base m-body-small z-10">
          Join us on a journey towards blessings and prosperity. Together, we
          can create positive change with the Islamic values we cherish.
        </p>
        <Button className="flex w-5/12 flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl">
          <p className="text-brand-50 m-body-base">Discover Campaign</p>
        </Button>
      </div>
    </div>
  );
};

export default Jumbotron;
