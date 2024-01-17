import { hotelTypes } from "@/lib/hotel-options-config";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <Card className="mt-4 h-72 overflow-auto">
      <CardHeader className="font-semibold text-theme-300">
        Hotel Type
      </CardHeader>
      <CardContent>
        {hotelTypes.map((hotelType) => (
          <div key={hotelType} className="flex">
            <Label className="flex items-center justify-center gap-2">
              <Input
                type="checkbox"
                name="hotelType"
                value={hotelType}
                onChange={onChange}
                checked={selectedHotelTypes.includes(hotelType)}
              />
              <div className="flex items-center text-sm font-semibold">
                <span className="whitespace-nowrap">{hotelType}</span>
              </div>
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HotelTypesFilter;
