"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  imageSources?: string[];
}

const ImageCarousel = ({ imageSources }: ImageCarouselProps) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <Carousel
      className="w-full h-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imageSources?.length === 0 || imageSources === undefined ? (
          <CarouselItem>
            <div className="h-60 w-full relative">
              <Image
                src={"/images/campaign-1.jpg"}
                alt="campaign image"
                layout="fill"
                objectFit="cover"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </CarouselItem>
        ) : (
          imageSources?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-60 w-full relative">
                <Image
                  src={image}
                  alt="campaign image"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
