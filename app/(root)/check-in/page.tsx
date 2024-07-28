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
import Calendar from "@/components/check-in/calendar";

const CheckInPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Card className="w-full bg-shadow rounded-xl">
        <CardHeader>
          <CardTitle className="w-full text-center font-ubuntu text-primary text-2xl">
            Daily Check In
          </CardTitle>
          <CardDescription className="w-full text-center font-ubuntu text-tertiary">
            Login every day to claim your daily reward.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckInPage;
