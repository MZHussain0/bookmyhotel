import {
  BuildingIcon,
  HotelIcon,
  IndianRupeeIcon,
  MapIcon,
  StarsIcon,
  WalletIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  hotel: HotelType;
};
const HotelCard = ({ hotel }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hotel.name}</CardTitle>
        <CardDescription>{hotel.description}</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
        <Button className="bg-muted hover:bg-muted/90 text-white">
          {<MapIcon className="w-5 h-5 mr-2 text-theme-300" />}
          {hotel.city}, {hotel.country}
        </Button>
        <Button className="bg-muted hover:bg-muted/90 text-white">
          {<BuildingIcon className="w-5 h-5 mr-2 text-theme-300" />}
          {hotel.type}
        </Button>
        <Button className="bg-muted hover:bg-muted/90 text-white">
          {<WalletIcon className="w-5 h-5 mr-2 text-theme-300" />}
          {<IndianRupeeIcon className="w-4 h-4 text-red-400" />}
          {hotel.pricePerNight} per night
        </Button>
        <Button className="bg-muted hover:bg-muted/90 text-white">
          {<HotelIcon className="w-5 h-5 mr-2 text-theme-300" />}
          {hotel.adultCount} adults, {hotel.childCount} children
        </Button>
        <Button className="bg-muted hover:bg-muted/90 text-white">
          {<StarsIcon className="w-5 h-5 mr-2 text-theme-300" />}
          {hotel.starRating} star rating
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link to={`/edit-hotel/${hotel._id}}`}>
          <Button className="bg-theme-300 hover:bg-theme-300/90 text-white font-semibold">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
