import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "./ui/card";
type Props = {
  selectedPrice?: number;
  onChange: (value: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <Card className="mt-4">
      <CardHeader className="font-semibold text-theme-300">Price</CardHeader>
      <CardContent>
        <Select
          value={selectedPrice?.toString() || "0"}
          onValueChange={(value: string) => {
            if (value === "0") {
              onChange(NaN);
            } else {
              onChange(Number(value));
            }
          }}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a max price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Max Price</SelectLabel>
            </SelectGroup>
            <SelectItem value={"0"}>All</SelectItem>
            {[500, 1000, 1500, 2000, 2500, 3000].map((price) => (
              <SelectItem value={price.toString()}>{price}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PriceFilter;
