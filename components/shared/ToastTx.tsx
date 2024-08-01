import React from "react";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { Address } from "viem";

interface ToastTransactionProps {
  txHash: Address | undefined;
  explorerName: string;
  explorerLink: string;
}

const ToastTx = ({
  explorerLink,
  explorerName,
  txHash,
}: ToastTransactionProps) => {
  return (
    <ToastAction altText={`View on ${explorerName}`} className="">
      <Link
        href={`${explorerLink}/tx/${txHash}`}
        passHref
        className="text-blue-500 underline"
        target="_blank"
      >
        {" "}
        View on {explorerName}{" "}
      </Link>
    </ToastAction>
  );
};

export default ToastTx;
