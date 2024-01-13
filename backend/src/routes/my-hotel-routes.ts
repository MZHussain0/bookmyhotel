import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import multer from "multer";
import verifyToken from "../middlewares/auth";
import Hotel from "../models/HotelModel";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
// /api/my-hotels (POST)
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required and must be a number"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage("Star rating is required and must be a number"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. Upload images to cloudinary
      const imageUrls = await uploadImages(imageFiles);

      // 2 if success, add urls to newHotels
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // 3. Save newHotels to database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. Send response with newHotels. status 201
      return res.status(201).send(hotel);
    } catch (error) {
      console.log("[MY_HOTEL_POST]", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/my-hotels (GET)
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).send(hotels);
  } catch (error) {
    console.log("[MY_HOTEL_GET]", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
