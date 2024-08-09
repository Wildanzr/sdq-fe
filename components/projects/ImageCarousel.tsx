"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";

const ImageCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <Carousel
      className="w-full h-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src={"/images/campaign-1.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-xl"
              alt="Campaign 1"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
