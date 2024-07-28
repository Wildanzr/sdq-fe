import Link from "next/link";
import React from "react";
import Image from "next/image";
import Connect from "../shared/Connect";
import { navigations } from "@/constants/common";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full h-full items-center justify-between p-5">
      <p className="hidden max-sm:flex">Tes</p>
      <Link href="/" className="flex items-center gap-1 max-sm:hidden">
        <Image
          src="/images/icon.png"
          width={30}
          height={30}
          alt="Haqq Wallet"
        />

        <p className="h2-bold font-ubunt text-primary">
          SDQ
          <span className="text-tertiary pl-1">Charity</span>
        </p>
      </Link>

      <div className="hidden flex-row space-x-5 items-center justify-center md:flex">
        {navigations.map((nav, idx) => (
          <Link
            key={idx}
            href={nav.href}
            className="text-tertiary font-spaceGrotesk text-lg"
          >
            {nav.label}
          </Link>
        ))}
      </div>

      <Connect />
    </nav>
  );
};

export default Navbar;
