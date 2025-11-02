import { useState } from "react";
import type { Activity } from "@prisma/client";
import { MainContainer } from "@/components/MainContainer";
import { ActivitySelectList } from "./ActivitySelectList";
import { SelectedActivity } from "./SelectedActivity";

export const RecordActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  return (
    <MainContainer className="flex h-full min-h-0 flex-col-reverse md:flex-row">
      <div className="flex flex-col min-h-0 h-3/12 md:h-auto md:w-3/12 md:pr-8">
        <ActivitySelectList setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
      </div>
      <div className="bg-text h-px md:h-auto md:w-px"></div>
      <div className="h-9/12 md:h-auto md:w-9/12 md:pl-8">
        <SelectedActivity activity={selectedActivity} />
      </div>
    </MainContainer>
  );
};
