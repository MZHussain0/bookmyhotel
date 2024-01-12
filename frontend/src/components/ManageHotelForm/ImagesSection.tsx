import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ManageHotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const { register } = useFormContext<ManageHotelFormData>();
  return (
    <div>
      <h2 className="font-bold pt-8 text-2xl text-theme-300 mb-4">
        Images Section
      </h2>
      <div className="grid w-full max-w-xs items-center gap-4">
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
