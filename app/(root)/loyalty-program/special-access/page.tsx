import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { navigations } from "@/constants/common";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SDQ | Special Access",
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
    siteName: "SDQ | Special Access",
    title: "SDQ | Special Access",
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

const SpecialAccessPage = () => {
  const nav = {
    label: "Special Access",
    href: "/loyalty-program/special-access",
  };
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[2], nav]} />
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="m-title-hero text-neutral-base">Special Access</h1>
      </div>
    </div>
  );
};

export default SpecialAccessPage;
