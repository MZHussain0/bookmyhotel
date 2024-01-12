import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ratings } from "@/lib/hotel-options-config";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ManageHotelFormData } from "./ManageHotelForm";

const DetailedSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelFormData>();
  return (
    <>
      <h1 className="font-bold pt-8 text-2xl text-theme-300">Hotel Details</h1>
      <FormField
        name={register("name").name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel
              className={cn(
                "font-semibold text-base capitalize",
                errors.name && "text-muted-foreground"
              )}>
              Hotel name
            </FormLabel>
            <FormControl>
              <Input placeholder="hotel name" {...field} className="py-6" />
            </FormControl>
            <FormMessage className="text-rose-400" />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          name={register("city").name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.city && "text-muted-foreground"
                )}>
                City
              </FormLabel>
              <FormControl>
                <Input placeholder="city name" {...field} className="py-6" />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
        <FormField
          name={register("country").name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.name && "text-muted-foreground"
                )}>
                Country
              </FormLabel>
              <FormControl>
                <Input placeholder="country name" {...field} className="py-6" />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={register("description").name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel
              className={cn(
                "font-semibold text-base capitalize",
                errors.description && "text-muted-foreground"
              )}>
              Description
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage className="text-rose-400" />
          </FormItem>
        )}
      />

      <div className="flex gap-4 items-center justify-start">
        <FormField
          name={register("pricePerNight").name}
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.pricePerNight && "text-muted-foreground"
                )}>
                Price per night
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="price per night"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onFocus={(e) => (e.target.value = "")}
                  className="py-6"
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />
        <FormField
          name="starRating"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel
                className={cn(
                  "font-semibold text-base capitalize",
                  errors.description && "text-muted-foreground"
                )}>
                Rating
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between py-6",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value
                        ? ratings.find((rating) => rating.value === field.value)
                            ?.label
                        : "Select star rating"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-1">
                  <Command>
                    <CommandGroup>
                      {ratings.map((rating) => (
                        <CommandItem
                          value={rating.label}
                          key={rating.value}
                          onSelect={() => {
                            field.onChange(rating.value);
                          }}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              rating.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {rating.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default DetailedSection;
