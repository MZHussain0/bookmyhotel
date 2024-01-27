import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "../ui/card";

type Props = {
  hotelId: number;
  pricePerNight: number;
};

const formSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
});

const GuestInfo = ({ pricePerNight }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: new Date(),
      checkOut: new Date(),
      adultCount: 1,
      childCount: 0,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex flex-col gap-4">
        <Card className="bg-theme-700">
          <CardContent>
            <h2 className="text-2xl">{pricePerNight} /-</h2>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default GuestInfo;
