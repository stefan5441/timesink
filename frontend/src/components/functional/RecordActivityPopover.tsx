import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { colorMap } from "../ui/custom/utils";
import { type Activity } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { useActivities } from "@/api/activity/activityQueries";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export const RecordActivityPopover = () => {
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>();

  const { data: activitiesData } = useActivities();

  const handleButtonClick = () => {
    if (!activity) return;
    navigate("current-activity", {
      state: { activityId: activity.id, activityName: activity.name, activityColor: activity.color },
    });
    setActivity(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm">
          Record an activity
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-w-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="leading-none font-medium text-sm">Record an activity</h4>
            <p className="text-muted-foreground text-xs">Pick an activity and start recording.</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Label className="text-xs" htmlFor="activityColor">
                Activity
              </Label>
              <Select
                value={activity?.id ?? ""}
                onValueChange={(value) => {
                  const selectedActivity = activitiesData?.find((a) => a.id === value);
                  setActivity(selectedActivity);
                }}
              >
                <SelectTrigger size="sm" className="w-50">
                  <SelectValue placeholder="Select an actiity" />
                </SelectTrigger>
                <SelectContent>
                  {activitiesData
                    ? activitiesData.map((a) => (
                        <SelectItem key={a.id} value={a.id} className="flex py-1 text-xs">
                          <span className={`w-3 h-3 rounded ${colorMap[a.color]}`}></span>
                          {a.name}
                        </SelectItem>
                      ))
                    : undefined}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button className="w-20" size="sm" variant="default" onClick={handleButtonClick} disabled={!activity}>
                Start
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
