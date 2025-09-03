import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { colorMap } from "../styling/utils";

export const CreateActivityModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New activity</Button>
      </DialogTrigger>

      <DialogContent className="w-[50vw] max-w-xl flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Create an activity</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="activityName">Activity name</Label>
            <Input id="activityName" placeholder="Competitive programming" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="activityColor">Activity color</Label>
            <Select>
              <SelectTrigger className="w-full">
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

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
