"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadImages from "./UploadImages";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  target: z.number().min(1),
});

const FormCampaign = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      target: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 w-full h-full"
      >
        <h2 className="m-heading text-neutral-base py-3 mb-0">
          Create Campaign
        </h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Campaign Title
                <span className="pl-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="Help Us to Stop War ...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-body-base text-neutral-base">
                Target
                <span className="pl-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="Help Us to Stop War ...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadImages />
        <Button
          type="submit"
          className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl"
        >
          Submit Campaign
        </Button>
      </form>
    </Form>
  );
};

export default FormCampaign;
