import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import AccessItem from "@/components/special-access/AccessItem";
import { Button } from "@/components/ui/button";
import { navigations } from "@/constants/common";
import { Metadata } from "next";
import React from "react";
import parse from "html-react-parser";

export const metadata: Metadata = {
  title: "SDQ | Item Details",
  description:
    "SDQ is a decentralized social network for charity and social good. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
  keywords: [
    "SDQ",
    "Social Good",
    "Charity",
    "Social Network",
    "Decentralized",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "SEO",
    "Performance",
  ],
  authors: [
    {
      name: "Danzrrr",
      url: "https://wildanzr.my.id",
    },
  ],
  creator: "Danzrrr",
  publisher: "Danzrrr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wildanzr.my.id",
    siteName: "SDQ | Item Details",
    title: "SDQ | Item Details",
    description:
      "SDQ is a decentralized social network for charity and social good. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
    images: [
      {
        url: "https://wildanzr.my.id/assets/images/icon.png",
        width: 1200,
        height: 630,
        alt: "SDQ | Social Good",
      },
    ],
  },
};

const SpecialAccessPage = ({ params, searchParams }: URLProps) => {
  const navs = [
    {
      label: "Special Access",
      href: "/loyalty-program/special-access",
    },
    {
      label: "Item Details",
      href: `/loyalty-program/special-access/${params.id}`,
    },
  ];
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb
          navigations={[navigations[0], navigations[2], ...navs]}
        />
      </div>

      <div className="flex flex-col w-full h-full items-start justify-start space-y-3">
        <AccessItem
          id={"1"}
          image="/images/dummy-1.jpg"
          price={1}
          sold={12}
          total={100}
          title="CoinFest Asia Ticket"
          className="rounded-none border-0"
        />
        <div className="flex flex-col w-full h-full items-start justify-start p-5 space-y-5">
          <h1 className="m-heading text-neutral-base">Special Access</h1>
          {parse("<p>Hello</p>")}

          <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
            <h1 className="m-heading text-neutral-base">Content</h1>
            {parse("<p>Hello</p>")}
          </div>
          <Button className="flex w-full flex-row items-center space-x-2 justify-center col-span-3 bg-gradient-to-r from-brand-60 to-secondary-base rounded-lg">
            Claim Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialAccessPage;
