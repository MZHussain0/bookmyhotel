import { amenities } from "@/lib/hotel-options-config";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ManageHotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelFormData>();
  return (
    <div>
      <h2 className="font-bold pt-8 text-2xl text-theme-300 mb-4">
        Facilities
      </h2>
      <FormField
        // control={form.control}
        name={register("facilities").name}
        render={({ field }) => (
          <div className="flex flex-wrap items-center gap-4">
            {amenities.map((item) => (
              <FormItem
                key={item.id}
                className="flex flex-row items-start justify-end space-x-3 space-y-0 bg-muted-foreground/10 px-4 py-2 rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.label)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value ?? []), item.label])
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.label
                            )
                          );
                    }}
                  />
                </FormControl>
                <FormLabel
                  className={cn("font-semibold cursor-pointer", {
                    "text-theme-200": field.value?.includes(item.id),
                    "text-white/20": errors.facilities,
                  })}>
                  {item.label}
                </FormLabel>
              </FormItem>
            ))}
            <FormMessage className="text-rose-500" />
          </div>
        )}
      />
    </div>
  );
};

export default FacilitiesSection;
