import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HotelType } from "../../../../backend/src/shared/types";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import DetailedSection from "./DetailedSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

type Props = {
  onSave: (hotelFormData: FormData) => void;
  hotel?: HotelType;
  hotelId?: string;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Hotel name is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  pricePerNight: z.number().min(1, {
    message: "Price per night is required.",
  }),
  starRating: z.enum(["1", "2", "3", "4", "5"]),
  type: z.string().min(1, {
    message: "Type is required.",
  }),
  facilities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  adultCount: z.number().min(1, { message: "Adult count is required." }),
  childCount: z.coerce.number().min(0, { message: "Child count is required." }),
  imageFiles: z
    .array(z.any())
    .refine((value) => value.length > 0, {
      message: "At least one image is required.",
    })
    .refine((value) => value.length <= 6, {
      message: "No more than 6 images can be uploaded.",
    }),
});

export type ManageHotelFormData = z.infer<typeof formSchema>;

const ManageHotelForm = ({ onSave, hotel, hotelId }: Props) => {
  console.log(hotelId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: "d",
    //   city: "d",
    //   country: "d",
    //   description: "d",
    //   pricePerNight: 1,
    //   starRating: "1",
    //   type: "Hostel",
    //   facilities: ["spa"],
    //   adultCount: 1,
    //   childCount: 0,
    //   imageFiles: [],
    // },
    defaultValues: hotel
      ? {
          ...hotel,
          starRating: hotel.starRating.toString() as
            | "1"
            | "2"
            | "3"
            | "4"
            | "5",
        }
      : undefined,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel?._id.toString());
    }
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("description", values.description);
    formData.append("pricePerNight", values.pricePerNight.toString());
    formData.append("starRating", values.starRating);
    formData.append("type", values.type);
    formData.append("adultCount", values.adultCount.toString());
    formData.append("childCount", values.childCount.toString());

    // if (hotel?.imageUrls) {
    //   hotel.imageUrls.forEach((imageFile) =>
    //     formData.append(`imageFiles`, imageFile)
    //   );
    // }

    values.imageFiles.forEach((imageFile) =>
      formData.append(`imageFiles`, imageFile)
    );

    values.facilities.forEach((facility) =>
      formData.append(`facilities`, facility)
    );
    onSave(formData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-theme-100">
          {hotelId ? "Edit a hotel" : "Register a hotel"}
        </h1>
        <div className=" flex flex-col gap-4">
          <DetailedSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImagesSection existingImageUrls={hotel?.imageUrls} />
        </div>
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className={cn(
            `max-w-md w-full mx-auto text-xl bg-theme-400 hover:bg-theme-400/90 text-white  "cursor-pointer`,
            {
              "cursor-not-allowed":
                !form.formState.isValid || form.formState.isSubmitting,
            }
          )}>
          {hotelId && form.formState.isSubmitting
            ? "Saving..."
            : hotelId
            ? "Edit Hotel"
            : "Add Hotel"}
        </Button>
      </form>
    </Form>
  );
};

export default ManageHotelForm;
