import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { colorMap } from "../ui/custom/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const CreateActivityModal = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">
          New activity
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[50vw] max-w-xl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Create an activity</h4>
            <p className="text-muted-foreground text-sm">Fill out the details below to create a new activity.</p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="activityName">Name</Label>
              <Input
                id="activityName"
                placeholder="Competitive programming"
                maxLength={50}
                className="col-span-2 h-8"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="activityColor">Color</Label>
              <Select>
                <SelectTrigger className="col-span-2 h-8">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(colorMap).map(([colorName, colorClass]) => (
                    <SelectItem key={colorName} value={colorName} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${colorClass}`}></span>
                      {colorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
