import { paginateCampaigns } from "@/actions/readWeb3";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import Campaigns from "@/components/views/Campaigns";
import { navigations } from "@/constants/common";

export default async function AllCampaignsPage({
  params,
  searchParams,
}: URLProps) {
  const page = searchParams.page ? +searchParams.page : 1;
  let limit = searchParams.limit ? +searchParams.limit : 10;
  if (limit > 20) limit = 20;

  const { campaigns, numberOfCampaigns } = await paginateCampaigns(page, limit);

  const nav = {
    label: "All Campaigns",
    href: "/campaigns",
  };
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], nav]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Campaigns campaigns={campaigns} />
      </div>
    </div>
  );
}
