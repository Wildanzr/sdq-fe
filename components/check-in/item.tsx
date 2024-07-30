import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ItemProps {
  day: number;
  amount: number;
  image: string;
  onClick: () => void;
  className?: string;
}

const Item = ({ className, amount, day, image }: ItemProps) => {
  return (
    <button
      className={cn(
        "flex flex-col space-y-2 items-center justify-center text-tertiary bg-brand-80 border-4 border-brand-40 rounded-lg h-32",
        className
      )}
    >
      <p className="font-ubuntu text-base font-medium text-white">Day {day}</p>
      <Image src={image} width={40} height={40} alt={`Day ${day}`} />
      <p className="font-ubuntu text-base font-medium text-white">{amount}</p>
    </button>
  );
};

export default Item;
