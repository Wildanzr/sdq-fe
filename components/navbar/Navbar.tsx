import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/haqq-wallet.webp"
          width={23}
          height={23}
          alt="Haqq Wallet"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev
          <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
    </nav>
  );
};

export default Navbar;
