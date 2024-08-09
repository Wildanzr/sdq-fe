"use client";

import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  message: z.string().min(1).max(100).optional(),
  token: z.string(),
  amount: z
    .string()
    .refine(
      (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
      {
        message: "Expected positive non-zero number, received a string",
      }
    ),
});

const FormDonation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      message: "",
      name: "",
      token: "",
    },
  });

  const handleCreateCampaign = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateCampaign)}
        className="flex flex-col space-y-3 w-full h-full"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Crypto
                <span className="pl-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormDonation;
