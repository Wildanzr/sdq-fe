import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NFTItemProps {
  isObtained: boolean;
  imageSrc: string;
  name: string;
  info: string;
  href?: string;
  className?: string;
}

const NFTItem = ({
  imageSrc,
  info,
  isObtained,
  name,
  className,
  href,
}: NFTItemProps) => {
  if (isObtained) {
    return (
      <Link href={href as string} className="flex h-40 w-full relative">
        <Image
          src="/images/sbt-campaign-1.png"
          layout="fill"
          className="rounded-lg object-contain cursor-pointer"
          alt="Soulbond"
        />
      </Link>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-40 w-full relative">
            <Image
              src={imageSrc}
              layout="fill"
              className={cn(
                "rounded-lg object-contain opacity-40 cursor-pointer hover:opacity-70",
                className
              )}
              alt={name}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">How to obtain?</h4>
              <p className="text-sm text-muted-foreground">{info}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
};
export default NFTItem;
