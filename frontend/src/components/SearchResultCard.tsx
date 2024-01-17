import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <Card className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-4">
      <CardHeader className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt="hotel cover image"
          className="w-full h-full object-cover object-center"
        />
      </CardHeader>
      <CardContent className="grid grid-rows-[1fr_2fr_1fr] mt-4">
        <div className=" flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </span>
            <Badge className="font-semibold">{hotel.type}</Badge>
          </div>
          <Link
            to={`/details/${hotel._id}`}
            className={`text-2xl font-bold pt-2 text-theme-200`}>
            {hotel.name}
          </Link>
        </div>

        <span className="text-sm font-semibold text-muted-foreground line-clamp-4 ">
          {hotel.description}
        </span>

        <div className="grid grid-cols-2 whitespace-nowrap items-end">
          <div className="flex gap-2 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <Badge
                key={facility}
                className="text-sm bg-theme-400 hover:bg-theme-400/90 text-white">
                {facility}
              </Badge>
            ))}
            <span>
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="flex flex-col items-end justify-center gap-1">
            <span className=" text-rose-400 font-semibold">
              Rs. {hotel.pricePerNight}
              <span className="text-white font-light"> per night</span>
            </span>
            <Link
              to={`/details/${hotel._id}`}
              className={`${buttonVariants()} 
                text-black font-semibold px-8`}>
              View more
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultCard;
