import NFTItem from "./NFTItem";
import { soulbounds } from "@/constants/common";

interface NFTListProps {
  soulboundsBalance: number[];
  campaignCount: number;
  donationCount: number;
  checkinCount: number;
}

const NFTList = ({
  checkinCount,
  soulboundsBalance,
  campaignCount,
  donationCount,
}: NFTListProps) => {
  const checkinSoulbounds = soulbounds.slice(0, 3).map((item, idx) => {
    return { ...item, isReadyToMint: checkinCount > item.requirement };
  });
  const donationSoulbounds = soulbounds.slice(3, 8).map((item, idx) => {
    return { ...item, isReadyToMint: donationCount > item.requirement };
  });
  const campaignSoulbounds = soulbounds.slice(8, 11).map((item, idx) => {
    return { ...item, isReadyToMint: campaignCount > item.requirement };
  });
  console.log("campaignSoulbounds", campaignSoulbounds);

  const sorted = [
    ...checkinSoulbounds,
    ...donationSoulbounds,
    ...campaignSoulbounds,
  ].map((item, idx) => {
    return { ...item, isObtained: soulboundsBalance[idx] === 1 };
  });

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <h2 className="text-neutral-base m-subheading">My Soulbond</h2>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {sorted.map((item, idx) => (
          <NFTItem
            key={idx}
            imageSrc={item.image}
            info={item.info}
            name={item.name}
            isObtained={soulboundsBalance[idx] === 1}
            readyToMint={item.isReadyToMint}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTList;
