import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Calendar from "@/components/check-in/Ccalendar";
import { checkInProducts } from "@/constants/common";
import Product from "@/components/shared/Product";

const CheckInPage = () => {
  return (
    <div className="flex flex-col space-y-6 w-full h-full items-center justify-center p-5">
      <Calendar />
      <h2 className="text-neutral-base m-title-page">Benefit of Check In</h2>

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
    </div>
  );
};

export default CheckInPage;
