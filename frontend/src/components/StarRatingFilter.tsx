import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <Card className="mt-4">
      <CardHeader className="font-semibold text-theme-300">
        Property Rating
      </CardHeader>
      <CardContent>
        {["5", "4", "3", "2", "1"].map((star) => (
          <div key={star} className="flex items-center">
            <Label className="flex items-center justify-center gap-2">
              <Input
                type="checkbox"
                name="starRating"
                value={star}
                onChange={onChange}
                checked={selectedStars.includes(star)}
                className=""
              />
              <span className="text-sm font-semibold">{star}</span>
              <span className="text-base font-semibold">
                {star === "1" ? "Star" : "Stars"}
              </span>
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StarRatingFilter;
