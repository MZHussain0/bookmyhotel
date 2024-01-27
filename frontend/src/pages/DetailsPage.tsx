import * as apiClient from "@/api-client";
import GuestInfo from "@/components/GuestInfoForm/GuestInfo";
import ImageCarousel from "@/components/ImageCarousel";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: hotelData } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotelData) return <div>Loading...</div>;
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <span className="flex">
          {Array.from({ length: hotelData.starRating }).map(() => (
            <StarIcon className="w-6 h-6 text-yellow-400 fill-current" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelData?.name}</h1>
      </div>

      <ImageCarousel images={hotelData.imageUrls} />

      <div className="flex flex-wrap gap-4 justify-center">
        {hotelData.facilities.map((facility) => (
          <Badge
            variant={"secondary"}
            className="text-lg font-semibold capitalize px-6 py-3 bg-theme-400 hover:bg-theme-400/95">
            {facility}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2">
        <div className="whitespace-pre-line">{hotelData.description}</div>
        <div className="h-fit ">
          <GuestInfo
            pricePerNight={hotelData.pricePerNight}
            hotelId={hotelData._id}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
