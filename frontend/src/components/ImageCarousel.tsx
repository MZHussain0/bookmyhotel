import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
};

const ImageCarousel = ({ images }: Props) => {
  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent className="">
        {images.map((image) => (
          <CarouselItem key={image} className="">
            <img
              src={image}
              alt="hotel cover image"
              className="w-full h-full object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
