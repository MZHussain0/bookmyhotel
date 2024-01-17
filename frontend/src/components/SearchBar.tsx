import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchContext } from "@/contexts/searchContext";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  destination: z.string(),
  adultCount: z.coerce.number().min(1),
  childCount: z.coerce.number().min(0).max(20),
  dateRange: z.date({
    required_error: "Select a date range.",
  }),
});

const SearchBar = () => {
  const search = useSearchContext();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      adultCount: 1,
      childCount: 0,
      dateRange: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    search.saveSearchValues(
      values.destination,
      date?.from || new Date(),
      date?.to || new Date(),
      values.adultCount,
      values.childCount
    );
    navigate("/search");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="-mt-9 px-2 py-2 bg-pink-500 rounded shadow-md grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 items-center justify-start">
        {/* Destination field */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="relative flex flex-row items-center p-2 w-full ">
              <MapPinIcon className="absolute text-theme-500 w-5 h-5 top-9 left-6 transform -translate-x-1/2 -translate-y-1/2" />{" "}
              <FormControl>
                <Input
                  placeholder="Where are you going?"
                  {...field}
                  className="bg-white pl-8 text-black font-semibold w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Adult count input */}
        <div>
          <FormField
            control={form.control}
            name="adultCount"
            render={({ field }) => (
              <FormItem className="relative flex flex-row items-center p-2 w-full">
                <FormLabel className="absolute text-theme-500 top-9 left-10 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                  Adults:
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    {...field}
                    className="bg-white pl-16 text-black font-semibold w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/*  child count input */}
        <div>
          <FormField
            control={form.control}
            name="childCount"
            render={({ field }) => (
              <FormItem className="relative flex flex-row items-center">
                <FormLabel className="absolute text-theme-500 top-7 left-12 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                  Children:
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    {...field}
                    className="bg-white pl-20 pr-2 text-black font-semibold w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date range picker */}

        <div className="flex gap-4 items-center justify-center col-span-2 md:col-span-1">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"default"}
                        size={"sm"}
                        className={cn(
                          "w-auto mt-2 justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick dates of your stay</span>
                        )}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-start mt-2  gap-2 w-full">
          <Button type="submit" variant={"outline"} className="w-2/3">
            Search
          </Button>
          <Button variant={"destructive"} className="w-1/3">
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
