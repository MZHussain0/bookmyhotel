﻿export type HotelType = {
  _id: number;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type HotelSearchResponseType = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
