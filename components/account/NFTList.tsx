import NFTItem from "./NFTItem";
import { soulbounds } from "@/constants/common";

const NFTList = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <h2 className="text-neutral-base m-subheading">My Soulbond</h2>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        {soulbounds.map((item, idx) => (
          <NFTItem
            key={idx}
            imageSrc={item.image}
            info={item.info}
            name={item.name}
            isObtained={item.isObtained}
            href="/account/my-soulbound/1/0x1234567890abcdef"
          />
        ))}
      </div>
    </div>
  );
};

export default NFTList;
