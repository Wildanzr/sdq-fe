import Jumbotron from "@/components/home/Jumbotron";
import Product from "@/components/shared/Product";
import { homeProducts } from "@/constants/common";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6 w-full h-full items-center justify-center">
      <Jumbotron />
      <div className="flex flex-col w-full h-full space-y-5 p-5">
        <h2 className="text-neutral-base text-center m-title-page p-5">
          Seamless, Secure, and Ethical Charity Solutions
        </h2>
        <div className="flex flex-col space-y-3 w-full h-full items-center justify-center">
          {homeProducts.map((item, idx) => (
            <Product
              key={idx}
              description={item.description}
              image={item.image}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
