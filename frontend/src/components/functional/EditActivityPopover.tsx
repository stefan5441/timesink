import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Color } from "@prisma/client";
import { colorMap } from "../ui/custom/utils";
import { useActivity, useUpdateActivity } from "@/api/activity/activityQueries";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

type Props = {
  activityId: string;
};

export const EditActivityPopover = ({ activityId }: Props) => {
  const [activityName, setActivityName] = useState<string>();
  const [activityColor, setActivityColor] = useState<Color | "">();

  const { data } = useActivity(activityId);
  const mutation = useUpdateActivity();

  const handleButtonClick = () => {
    if (!activityName || !activityColor) return;
    mutation.mutate({ id: activityId, name: activityName, color: activityColor });
    setActivityName("");
    setActivityColor("");
  };

  useEffect(() => {
    if (data) {
      setActivityName(data.name);
      setActivityColor(data.color);
    }
  }, [data]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-xl">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label className="text-xs" htmlFor="activityName">
              Name
            </Label>
            <Input
              className="h-7 text-xs w-50"
              id="activityName"
              placeholder="Leetcoding"
              maxLength={50}
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <Label className="text-xs" htmlFor="activityColor">
              Color
            </Label>
            <Select value={activityColor} onValueChange={(value) => setActivityColor(value as Color)}>
              <SelectTrigger size="sm" className="w-50">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(colorMap).map(([colorName, colorClass]) => (
                  <SelectItem key={colorName} value={colorName} className="flex py-1 text-xs">
                    <span className={`w-3 h-3 rounded ${colorClass}`}></span>
                    {colorName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              className="w-20"
              size="sm"
              variant="default"
              onClick={handleButtonClick}
              disabled={!activityName || !activityColor}
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
