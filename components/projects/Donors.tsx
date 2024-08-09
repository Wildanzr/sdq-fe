import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Message from "./Message";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Anonymous",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "Ahmad Bukhori Muslim",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const Donors = () => {
  return (
    <div className="flex flex-col w-full h-full text-neutral-base">
      <h2 className="m-title-page text-start">Donors</h2>
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Tx</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>
                <Message from="Adam" message="I have sent you the payment" />
              </TableCell>
              <TableCell className="flex items-center justify-end">
                <Link href="#">
                  <FaExternalLinkAlt
                    className="text-neutral-base cursor-pointer"
                    size={20}
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Donors;
