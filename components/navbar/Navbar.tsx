import Link from "next/link";
import React from "react";
import Image from "next/image";
import Connect from "../shared/Connect";
import MobileNav from "./MobileNav";
import BigNav from "./BigNav";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full h-full items-center justify-between p-5">
      <MobileNav />
      <Link href="/" className="flex items-center gap-1 max-md:hidden">
        <Image
          src="/images/icon.png"
          width={30}
          height={30}
          alt="Haqq Wallet"
        />

        <p className="font-ubuntu text-3xl text-primary">
          SDQ
          <span className="text-tertiary pl-1">Charity</span>
        </p>
      </Link>

      <div className="hidden flex-row items-center justify-center md:flex">
        <BigNav />
      </div>

      <Connect />
    </nav>
  );
};

export default Navbar;
