"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa6";
import { navigations, userColors } from "@/constants/common";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {navigations.map((item) => {
        const isActive =
          (pathname.includes(item.href) && item.href.length > 1) ||
          pathname === item.href;
        return (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-tertiary"
                  : "text-primary"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <p className={`${isActive ? "text-xl" : "text-base"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaBars
          className="hidden cursor-pointer max-md:flex"
          size={30}
          color={userColors.tertiary}
        />
      </SheetTrigger>
      <SheetContent side="left" className="bg-shadow border-none">
        <SheetHeader>
          <Link href="/" className="flex items-center gap-1">
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

          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
