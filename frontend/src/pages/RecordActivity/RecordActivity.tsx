import { useState } from "react";
import type { Activity } from "@prisma/client";
import { MainContainer } from "@/components/MainContainer";
import { ActivitySelectList } from "./ActivitySelectList";
import { SelectedActivity } from "./SelectedActivity";

export const RecordActivity = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  return (
    <MainContainer className="flex md:flex-row flex-col-reverse h-full min-h-0">
      <div className="flex flex-col md:pr-8 md:w-3/12 h-3/12 md:h-auto min-h-0">
        <ActivitySelectList setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
      </div>

      <div className="bg-text md:w-px h-px md:h-auto"></div>

      <div className="md:pl-8 md:w-9/12 h-9/12 md:h-auto">
        <SelectedActivity activity={selectedActivity} />
      </div>
    </MainContainer>
  );
};
