import { useEffect, useState } from "react";
import { Color } from "@prisma/client";
import { textColorMap } from "@/components/utils";
import { useActivity, useCreateActivity, useUpdateActivity } from "@/api/activity/activityQueries";

type Props = {
  activityId?: string;
  onCancel: () => void;
};

export const CreateEditActivityForm = ({ activityId, onCancel }: Props) => {
  const isEditMode = !!activityId;

  const [activityName, setActivityName] = useState<string>("");
  const [activityColor, setActivityColor] = useState<Color | "">("");

  const { data: activityData } = useActivity(activityId ?? "");
  const updateMutation = useUpdateActivity();
  const createMutation = useCreateActivity();

  const handleButtonClick = () => {
    if (!activityName || !activityColor) return;

    if (isEditMode) {
      updateMutation.mutate({ id: activityId, name: activityName, color: activityColor });
    } else {
      createMutation.mutate({ name: activityName, color: activityColor });
    }

    setActivityName("");
    setActivityColor("");
    onCancel();
  };

  useEffect(() => {
    if (activityData) {
      setActivityName(activityData.name);
      setActivityColor(activityData.color);
    }
  }, [activityData]);

  return (
    <div className="flex flex-col gap-6 ">
      <h3 className="text-4xl">{isEditMode ? "edit activity" : "create activity"}</h3>

      <div className="flex flex-col gap-1">
        <label htmlFor="activityName" className="text-xl">
          name
        </label>
        <input
          id="activityName"
          placeholder="Leetcoding"
          maxLength={50}
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className="text-2xl px-2 py-1 rounded ring-1 ring-border hover:ring-2 
          hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="activityColor" className="text-xl">
          color
        </label>
        <select
          id="activityColor"
          value={activityColor}
          onChange={(e) => setActivityColor(e.target.value as Color)}
          className="text-2xl px-2 py-1 rounded ring-1 ring-border hover:ring-2 
          hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        >
          <option value="" disabled>
            Select a color...
          </option>
          {Object.entries(textColorMap).map(([colorName, colorClass]) => (
            <option key={colorName} value={colorName} className={`${colorClass}`}>
              {colorName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleButtonClick}
          disabled={!activityName || !activityColor}
          className="w-full text-2xl px-2 py-1 rounded ring-1 ring-border hover:ring-2 
          hover:ring-primary"
        >
          save
        </button>
        {isEditMode && (
          <button
            onClick={() => {
              setActivityName("");
              setActivityColor("");
              onCancel();
            }}
            className="w-full text-2xl px-2 py-1 rounded ring-1 ring-border hover:ring-2 
          hover:ring-danger"
          >
            cancel
          </button>
        )}
      </div>
    </div>
  );
};
