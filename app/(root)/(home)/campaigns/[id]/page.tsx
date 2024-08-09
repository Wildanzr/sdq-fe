import ItemDetails from "@/components/projects/ItemDetails";
import { Button } from "@/components/ui/button";
import { PiShareFatThin } from "react-icons/pi";
import Creator from "@/components/projects/Creator";
import Overview from "@/components/projects/Overview";
import Donors from "@/components/projects/Donors";

const CampaignDetails = () => {
  const content = `
  <p><em>Hello </em>this is <strong>meong </strong></p>\n<p style=\"text-align: center;\">Ini kucing garong</p>\n<p style=\"text-align: right;\">inii</p>\n<p style=\"text-align: justify;\">asdsadasd</p>\n<ul>\n<li style=\"text-align: justify;\">asdasd</li>\n<li style=\"text-align: justify;\">asdsa</li>\n<li style=\"text-align: justify;\">sdfdsfds</li>\n</ul>\n<ol>\n<li style=\"text-align: justify;\">sdfsdf</li>\n<li style=\"text-align: justify;\">sdf</li>\n<li style=\"text-align: justify;\">dsfhdf</li>\n</ol>\n<p style=\"text-align: justify;\"><span style=\"color: #e03e2d;\">HAHAHHA</span></p>",
"target":"1123"`;
  return (
    <div className="flex flex-col space-y-5 w-full h-full p-5">
      <ItemDetails />
      <div className="flex flex-row space-x-5 w-full h-full">
        <Button className="border border-brand-base rounded-lg bg-primary-100">
          <PiShareFatThin className="text-brand-base" />
        </Button>
        <Button className="flex w-full flex-row space-x-3 text-neutral-base z-10 bg-primary-100 border border-brand-base rounded-lg p-2">
          <p className="m-body-base">Donate Now</p>
        </Button>
      </div>
      <Creator
        address="0x6eC7D0B2c30f7C4C6E5f9d8Fce81C2E2a9D9d5E4"
        verified={true}
      />
      <Overview content={content} />
      <Donors />
    </div>
  );
};

export default CampaignDetails;
