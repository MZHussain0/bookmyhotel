import { Label } from "@radix-ui/react-label";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ManageHotelFormData } from "./ManageHotelForm";

type Props = {
  existingImageUrls?: string[];
};

const ImagesSection = ({ existingImageUrls }: Props) => {
  const [imageUrls, setImageUrls] = useState(existingImageUrls);
  const { register, setValue } = useFormContext<ManageHotelFormData>();

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    const updatedImageUrls = imageUrls?.filter((url) => url !== imageUrl);
    setImageUrls(updatedImageUrls);
    setValue("imageFiles", updatedImageUrls || []);
  };
  return (
    <div>
      <h2 className="font-bold pt-8 text-2xl text-theme-300 mb-4">
        Images Section
      </h2>
      <div className="grid w-full max-w-xs items-center gap-4">
        <div className="w-full flex items-center justify-center gap-2">
          {imageUrls?.map((imageUrl) => (
            <div key={imageUrl} className="h-32 w-32 relative group">
              <img
                src={imageUrl}
                alt="hotel"
                className="object-cover rounded-lg w-full h-full"
              />
              <Button
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-80 flex items-center justify-center transition-all duration-300"
                onClick={(e) => handleDelete(e, imageUrl)}
                size={"icon"}
                variant={"destructive"}>
                <Trash2Icon className="" />
              </Button>
            </div>
          ))}
        </div>
        <FormField
          name={register("imageFiles").name}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="image-upload">Upload Image</Label>
              <FormControl>
                <Input
                  className="border-gray-300 bg-theme-300"
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const filesArray = Array.from(e.target.files);
                    field.onChange(filesArray);
                  }}
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImagesSection;
