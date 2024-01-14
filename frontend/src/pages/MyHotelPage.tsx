import * as apiClient from "@/api-client";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const MyHotelPage = () => {
  const { data: hotelsData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelsData) return <span>No hotels found</span>;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-theme-400 pb-2">
        <h1 className="text-3xl font-semibold">My Hotels</h1>
        <Link to="/add-hotel">
          <Button className="bg-theme-300 font-semibold text-white hover:bg-theme-300/90">
            Add Hotel
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {hotelsData?.map((hotel) => (
          <div className="" key={hotel._id}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotelPage;
