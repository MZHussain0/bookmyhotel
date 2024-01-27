import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import Hotel from "../models/HotelModel";
import { HotelSearchResponseType } from "../shared/types";

const router = express.Router();

// /api/hotels/:id

// /api/hotels/search?
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    // console.log(query);
    // console.log(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt((req.query.page as string) || "1");
    const skip = pageSize * (pageNumber - 1);

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    // const total = await Hotel.countDocuments();
    const total = hotels.length;

    const response: HotelSearchResponseType = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("[HOTELS_SEARCH]: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    let destinations = Array.isArray(queryParams.destination)
      ? queryParams.destination
      : [queryParams.destination];
    destinations = destinations.map(
      (destination: string) => new RegExp(escapeRegExp(destination), "i")
    );
    constructedQuery.$or = [
      { city: { $in: destinations } },
      { country: { $in: destinations } },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hotel = await Hotel.findById(req.params.id.toString());
      res.status(200).json(hotel);
    } catch (error) {
      console.log("[HOTEL_DETAILS]: ", error);
      res.status(500).json({ message: errors.array() });
    }
  }
);
export default router;
