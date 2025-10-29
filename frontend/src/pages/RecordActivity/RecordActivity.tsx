import { useState } from "react";
import type { Activity } from "@prisma/client";
import { MainContainer } from "@/components/MainContainer";
import { ActivitySelectList } from "./ActivitySelectList";
import { SelectedActivity } from "./SelectedActivity";

export const RecordActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  return (
    <MainContainer className="flex h-full min-h-0">
      <div className="w-3/12 pr-8 flex flex-col min-h-0">
        <ActivitySelectList setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
      </div>

      <div className="w-px bg-black"></div>

      <div className="w-9/12 pl-8">
        <SelectedActivity activity={selectedActivity} />
      </div>
    </MainContainer>
  );
};
