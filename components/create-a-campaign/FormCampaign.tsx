"use client";

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
import { Input } from "@/components/ui/input";
import UploadImages from "./UploadImages";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { DollarSign } from "lucide-react";
import { States } from "@/components/create-a-campaign/FormState";
import { createCampaign } from "@/web3/charity";
import { useToast } from "../ui/use-toast";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { getExplorerDetails } from "@/lib/utils";
import useWaitForTxAction from "@/hooks/useWaitForTx";
import ToastTx from "../shared/ToastTx";
import { useRouter } from "next/navigation";

interface FormCampaignProps {
  children: React.ReactNode;
  handleUploadImages: (files: File[]) => Promise<string[]>;
  handleUploadIPFS: (content: string) => Promise<any>;
  formStates: States;
  setFormStates: (value: React.SetStateAction<States>) => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(100)
    .refine((val) => val.trim() !== "", {
      message: "Title is required",
    }),
  details: z
    .string()
    .min(3)
    .max(50000)
    .refine((val) => val.trim() !== "", {
      message: "Details is required",
    }),
  target: z
    .string()
    .refine(
      (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0,
      {
        message: "Expected positive non-zero number, received a string",
      }
    ),
});

const FormCampaign = ({
  children,
  handleUploadIPFS,
  handleUploadImages,
  formStates,
  setFormStates,
}: FormCampaignProps) => {
  const { toast } = useToast();
  const { chainId } = useAccount();
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>([]);
  const editorRef = useRef<any>(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const etherscan = getExplorerDetails(chainId);
  const action = () => {
    if (txHash !== undefined) {
      toast({
        title: "Transaction Done",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={txHash}
          />
        ),
      });

      setTxHash(undefined);
      setFormStates((_prev) => ({
        isSubmitting: false,
        first: false,
        second: false,
        third: false,
      }));
      setFiles(null);
      editorRef.current.setContent("");
      setDisabledButton(false);
      form.reset();
      router.push("my-campaigns");
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      target: "0",
    },
  });

  const handleCreateCampaign = async (values: z.infer<typeof formSchema>) => {
    if (files === null || files.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload images to create a campaign",
        variant: "destructive",
      });
      return;
    }
    setFormStates((prev) => ({ ...prev, isSubmitting: true }));
    setDisabledButton(true);
    try {
      const imageList = await handleUploadImages(files!);
      const metadata: Object = {
        title: values.title,
        details: values.details,
        target: values.target,
        images: imageList,
        previous: "",
      };
      const ipfsHash = await handleUploadIPFS(JSON.stringify(metadata));
      const res = await createCampaign(
        values.title,
        ipfsHash.ipfsHash,
        values.target
      );
      setTxHash(res);
      toast({
        title: "Transaction submitted",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={res}
          />
        ),
      });
    } catch (error: any) {
      console.error("Error in handleCreateCampaign", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setFormStates((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleFileChange = async (files: File[] | null) => {
    if (!files) return;
    setFiles(files);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateCampaign)}
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
          name="details"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => {
                    field.onChange(content);
                  }}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
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
                  startIcon={DollarSign}
                  type="number"
                  min={0}
                  className="bg-primary-100 border border-primary-90 text-neutral-base"
                  placeholder="10000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadImages files={files} onFilesChange={handleFileChange} />

        {children}
        <Button
          type="submit"
          disabled={formStates.isSubmitting || disabledButton}
          className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl"
        >
          {formStates.isSubmitting === false
            ? "Submit Campaign"
            : formStates.first === false
            ? "Uploading Images"
            : formStates.second === false
            ? "Uploading to IPFS"
            : "Sign Transaction"}
        </Button>
      </form>
    </Form>
  );
};

export default FormCampaign;
