import Link from "next/link";
import React from "react";
import Image from "next/image";
import Connect from "../shared/Connect";
import MobileNav from "./MobileNav";
import BigNav from "./BigNav";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full h-full items-center justify-between pb-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/icon.png"
          width={30}
          height={30}
          alt="Haqq Wallet"
        />

        <p className="font-ubuntu text-2xl text-brand-base">
          SDQ
          <span className="text-neutral-base pl-1">Charity</span>
        </p>
      </Link>

      <div className="hidden flex-row items-center justify-center md:flex">
        <BigNav />
      </div>

      <div className="flex flex-row items-center space-x-2 justify-center">
        <Connect />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
