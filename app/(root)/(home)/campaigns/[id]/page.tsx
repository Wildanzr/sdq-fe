import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import CampaignDetails from "@/components/views/CampaignDetails";
import { navigations } from "@/constants/common";
import { redirect } from "next/navigation";

export default function CampaignDetailsPage({
  params,
  searchParams,
}: URLProps) {
  if (isNaN(Number(params.id))) {
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
        <CampaignDetails campaignId={Number(params.id)} />
      </div>
    </div>
  );
}
