import {
  getMinimumCampaignDetails,
  getNumberOfCampaigns,
} from "@/actions/readWeb3";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { navigations } from "@/constants/common";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const isValidId = !isNaN(Number(params.id));
  const page = searchParams.page ? +searchParams.page : 1;
  const numberOfCampaigns = await getNumberOfCampaigns();
  const isPageOutOfRange = page > numberOfCampaigns;
  if (!isValidId || isPageOutOfRange) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  const campaign = (await getMinimumCampaignDetails(page)) as MinimumCampaign;

  return {
    title: `SDQ | ${campaign.title}`,
    description: campaign.description,
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
      siteName: `SDQ | ${campaign.title}`,
      title: `SDQ | ${campaign.title}`,
      description: campaign.description,
      images: [
        {
          url: campaign.images[0],
          width: 1200,
          height: 630,
          alt: `${campaign.title}`,
        },
      ],
    },
  };
}

export default async function CampaignDetailsPage({
  params,
  searchParams,
}: URLProps) {
  const isValidId = !isNaN(Number(params.id));
  const page = searchParams.page ? +searchParams.page : 1;
  const numberOfCampaigns = await getNumberOfCampaigns();
  const isPageOutOfRange = page > numberOfCampaigns;

  if (!isValidId || isPageOutOfRange) {
    return redirect("/not-found");
  }

  const navs = [
    {
      label: "All Campaigns",
      href: "/campaigns",
    },
    {
      label: searchParams.title || params.id,
      href: `/campaigns/${params.id}?title=${searchParams.title}`,
    },
  ];
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], ...navs]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        {/* <CampaignDetails campaignId={Number(params.id)} /> */}
      </div>
    </div>
  );
}
