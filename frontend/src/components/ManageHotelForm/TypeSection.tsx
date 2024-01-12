import { hotelTypes } from "@/lib/hotel-options-config";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ManageHotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelFormData>();

  return (
    <div>
      <h2 className="font-bold pt-8 text-2xl text-theme-300 mb-4">Types</h2>
      <FormField
        name={register("type").name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {hotelTypes.map((type) => (
                  <FormItem
                    className={cn(
                      "bg-muted-foreground/10 text-white/80 hover:bg-muted-foreground/20 font-semibold  rounded-md text-center duration-300",
                      {
                        "bg-theme-400 hover:bg-theme-400/95":
                          field.value === type,
                      }
                    )}
                    key={type}>
                    <label
                      className={cn(
                        "w-full h-full flex items-center justify-center cursor-pointer",
                        {
                          "text-white/20": errors.type,
                        }
                      )}>
                      <FormControl>
                        <RadioGroupItem value={type} className="sr-only" />
                      </FormControl>
                      <span className="px-4 py-2">{type}</span>
                    </label>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-rose-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TypeSection;
