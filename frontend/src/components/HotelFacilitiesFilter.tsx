import { amenities } from "@/lib/hotel-options-config";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

type Props = {
  selectedHotelFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFacilitiesFilter = ({
  selectedHotelFacilities,
  onChange,
}: Props) => {
  return (
    <Card className="mt-4 h-72 overflow-auto">
      <CardHeader className="font-semibold text-theme-300">
        Facilities
      </CardHeader>
      <CardContent>
        {amenities.map((facility) => (
          <div key={facility.id} className="flex">
            <Label className="flex items-center justify-center gap-2">
              <Input
                type="checkbox"
                name="facility"
                value={facility.label}
                onChange={onChange}
                checked={selectedHotelFacilities.includes(facility.label)}
              />
              <div className="flex items-center text-sm font-semibold">
                <span className="whitespace-nowrap">{facility.label}</span>
              </div>
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HotelFacilitiesFilter;
