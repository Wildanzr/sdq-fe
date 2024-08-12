import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { Button } from "@/components/ui/button";
import { navigations } from "@/constants/common";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "SDQ | Ticket Raffle",
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
    siteName: "SDQ | Ticket Raffle",
    title: "SDQ | Ticket Raffle",
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

const TicketRafflePage = () => {
  const nav = {
    label: "Ticket Raffle",
    href: "/loyalty-program/ticket-raffle",
  };
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[2], nav]} />
      </div>
      <div className="flex flex-col w-full h-full items-start justify-start space-y-5 p-5">
        <h1 className="m-heading text-neutral-base">
          Celebrating your loyalty
        </h1>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <div className="bg-red-500 col-span-2 h-32 rounded-lg items-center justify-center flex">
            Grand Prize
          </div>
          <div className="bg-red-500 h-32 rounded-lg items-center justify-center flex">
            2nd Winner
          </div>
          <div className="bg-red-500 h-32 rounded-lg items-center justify-center flex">
            3rd Winner
          </div>
          <div className="bg-red-500 h-32 rounded-lg items-center justify-center flex">
            4th Winner
          </div>
          <div className="bg-red-500 h-32 rounded-lg items-center justify-center flex">
            5th Winner
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
        <h1 className="m-heading text-neutral-base">What is Ticket Raffle?</h1>
        <p className="m-body-base text-neutral-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe soluta
          voluptas natus ducimus atque non maiores aliquid, delectus
          exercitationem illum? Fugit reprehenderit eaque fugiat tenetur vitae
          velit doloremque culpa accusantium!
        </p>
      </div>

      <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
        <h1 className="m-heading text-neutral-base">How to participate?</h1>
        <p className="m-body-base text-neutral-base">
          Complete time-limited tasks from carefully selected list of projects
          to earn extra Blum Points
        </p>

        <div className="flex flex-col w-full h-full items-start justify-start pt-5 space-y-5">
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <Image
                src="/icons/nft.png"
                width={40}
                height={40}
                alt="NFT"
                className="rounded-full"
              />
              <p className="m-body-base text-neutral-base">
                Hold 3 Soulbound NFTs
              </p>
            </div>

            <Button>Start</Button>
          </div>
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <Image
                src="/icons/checkin.png"
                width={40}
                height={40}
                alt="Checkin"
                className="rounded-full"
              />
              <p className="m-body-base text-neutral-base">
                Consecutive check-in for 5 days
              </p>
            </div>

            <Button>Start</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
        <h1 className="m-heading text-neutral-base">SDQ Socials 1</h1>
        <p className="m-body-base text-neutral-base">
          Complete social tasks to earn more points
        </p>

        <div className="flex flex-col w-full h-full items-start justify-start pt-5 space-y-5">
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <FaInstagram size={40} className="rounded-full text-brand-base" />
              <p className="m-body-base text-neutral-base">
                Follow SDQ on Instagram
              </p>
            </div>

            <Button>Start</Button>
          </div>
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <FaTwitter size={40} className="rounded-full text-brand-base" />
              <p className="m-body-base text-neutral-base">
                Follow SDQ on Twitter
              </p>
            </div>

            <Button>Start</Button>
          </div>
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <FaTwitter size={40} className="rounded-full text-brand-base" />
              <p className="m-body-base text-neutral-base">
                Follow CoinFest on Twitter
              </p>
            </div>

            <Button>Start</Button>
          </div>
          <div className="flex flex-row w-full h-full items-start justify-between">
            <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
              <FaTwitter size={40} className="rounded-full text-brand-base" />
              <p className="m-body-base text-neutral-base">
                Follow ETHSEA on Twitter
              </p>
            </div>

            <Button>Start</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketRafflePage;
