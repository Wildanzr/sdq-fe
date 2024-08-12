import NFTItem from "./NFTItem";

const NFTList = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <h2 className="text-neutral-base m-subheading">My Soulbond</h2>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        <NFTItem
          imageSrc="/images/sbt-campaign-1.png"
          info="You should create minimum 1 campaign to obtain this NFT."
          name="Soulbond Campaign 1"
          isObtained={true}
          href="/account/my-soulbound/1/0x1234567890abcdef"
        />
        <NFTItem
          imageSrc="/images/sbt-campaign-1.png"
          info="You should create minimum 1 campaign to obtain this NFT."
          name="Soulbond Campaign 1"
          isObtained={false}
          href="/account/my-soulbound/1/0x1234567890abcdef"
        />
        <NFTItem
          imageSrc="/images/sbt-campaign-1.png"
          info="You should create minimum 1 campaign to obtain this NFT."
          name="Soulbond Campaign 1"
          isObtained={false}
          href="/account/my-soulbound/1/0x1234567890abcdef"
        />
        <NFTItem
          imageSrc="/images/sbt-campaign-1.png"
          info="You should create minimum 1 campaign to obtain this NFT."
          name="Soulbond Campaign 1"
          isObtained={false}
          href="/account/my-soulbound/1/0x1234567890abcdef"
        />
      </div>
    </div>
  );
};

export default NFTList;
