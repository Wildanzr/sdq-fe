import HomeProjects from "@/components/home/HomeProjects";
import Jumbotron from "@/components/home/Jumbotron";
import Product from "@/components/shared/Product";
import { homeProducts } from "@/constants/common";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col space-y-6 w-full h-full bg-meteor-stars">
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

      <div className="flex flex-col items-center justify-center w-full h-full space-y-5 p-5">
        <h2 className="text-neutral-base m-title-page text-start">
          Featured Projects
        </h2>
        {/* <HomeProjects /> */}

        <Link
          href="/campaigns"
          className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl p-2"
        >
          <p className="m-body-base">See all projects</p>
        </Link>
      </div>
    </div>
  );
}
