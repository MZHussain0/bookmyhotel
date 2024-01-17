import * as apiClient from "@/api-client";
import HotelFacilitiesFilter from "@/components/HotelFacilitiesFilter";
import HotelTypesFilter from "@/components/HotelTypesFilter";
import PaginationComponent from "@/components/PaginationComponent";
import PriceFilter from "@/components/PriceFilter";
import SearchResultCard from "@/components/SearchResultCard";
import StarRatingFilter from "@/components/StarRatingFilter";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchContext } from "@/contexts/searchContext";
import { useState } from "react";
import { useQuery } from "react-query";

const SearchPage = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
    string[]
  >([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    destination: search.destination.toString(),
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchListings(searchParams)
  );

  const handleStarRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (selectedStars.includes(value)) {
      setSelectedStars(selectedStars.filter((star) => star !== value));
    } else {
      setSelectedStars([...selectedStars, value]);
    }
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (selectedHotelTypes.includes(value)) {
      setSelectedHotelTypes(
        selectedHotelTypes.filter((hotelType) => hotelType !== value)
      );
    } else {
      setSelectedHotelTypes([...selectedHotelTypes, value]);
    }
  };

  const handleHotelFacilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (selectedHotelFacilities.includes(value)) {
      setSelectedHotelFacilities(
        selectedHotelFacilities.filter(
          (hotelFacility) => hotelFacility !== value
        )
      );
    } else {
      setSelectedHotelFacilities([...selectedHotelFacilities, value]);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <Card className="p-4 sticky top-0 lg:top-10 h-fit bg-theme-900 shadow-sm shadow-white">
        <CardHeader className="text-xl border-b">Filter By:</CardHeader>
        {/* TODO: Filters */}

        <StarRatingFilter
          selectedStars={selectedStars}
          onChange={handleStarRatingChange}
        />
        <HotelTypesFilter
          selectedHotelTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
        />
        <HotelFacilitiesFilter
          selectedHotelFacilities={selectedHotelFacilities}
          onChange={handleHotelFacilityChange}
        />
        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(value?: number) => setSelectedPrice(value)}
        />
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">
            {" "}
            {hotelData?.pagination.total} hotels found
            {search.destination ? ` for ${search.destination}` : ""}
          </span>
          {/* TODO: Sort Options */}
          <div>
            <Select
              value={sortOption}
              onValueChange={(value: string) => setSortOption(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Sort By:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
                <SelectItem value={"starRating"}>Star Rating</SelectItem>
                <SelectItem value={"pricePerNightAsc"}>
                  Price Per Night (low to high)
                </SelectItem>
                <SelectItem value={"pricePerNightDesc"}>
                  Price Per Night (high to low)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hotelData?.data.map((hotel) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}

        <div className="">
          <PaginationComponent
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
