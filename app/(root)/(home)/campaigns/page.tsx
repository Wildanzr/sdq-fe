import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import Campaigns from "@/components/views/Campaigns";
import { navigations } from "@/constants/common";

export default async function AllCampaignsPage() {
  const campaigns = {
    label: "All Campaigns",
    href: "/campaigns",
  };
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], campaigns]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Campaigns />
      </div>
    </div>
  );
}
