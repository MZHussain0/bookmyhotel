import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ManageHotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelFormData>();
  return (
    <div>
      <h2 className="font-bold pt-8 text-2xl text-theme-300 mb-4">Guests</h2>
      <div className="flex gap-2">
        <FormField
          name={register("adultCount").name}
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.adultCount && "text-muted-foreground"
                )}>
                Adults
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="adults"
                  {...field}
                  className="py-6"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onFocus={(e) => (e.target.value = "")}
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
        <FormField
          name={register("childCount").name}
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.childCount && "text-muted-foreground"
                )}>
                Children
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="children"
                  {...field}
                  className="py-6"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onFocus={(e) => (e.target.value = "")}
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

export default GuestSection;
