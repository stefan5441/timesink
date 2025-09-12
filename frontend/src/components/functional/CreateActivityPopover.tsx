import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Color } from "@prisma/client";
import { colorMap } from "../ui/custom/utils";
import { useMutation } from "@tanstack/react-query";
import { createActivity } from "@/api/activityServices";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export const CreateActivityPopover = () => {
  const [activityName, setActivityName] = useState<string>("");
  const [activityColor, setActivityColor] = useState<Color | "">("");

  const mutation = useMutation({
    mutationFn: createActivity,
  });

  const handleButtonClick = () => {
    if (!activityName || !activityColor) return;
    mutation.mutate({ name: activityName, color: activityColor });
    setActivityName("");
    setActivityColor("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm">
          New activity
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="leading-none font-medium text-sm">Create an activity</h4>
            <p className="text-muted-foreground text-xs">Fill out the details below to create a new activity.</p>
          </div>

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
                Add
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
