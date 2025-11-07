import { useState } from "react";
import type { Activity } from "@prisma/client";
import { ActivityStatistics } from "./ActivityStatistics";
import { MainContainer } from "@/components/MainContainer";
import { ActivitySelectList } from "../RecordActivity/ActivitySelectList";
import { ActivityRecordHistoryList } from "./ActivityRecordHistoryList";

export const Statistics = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  return (
    <MainContainer className="flex md:flex-row flex-col h-full min-h-0">
      {selectedActivity ? (
        <>
          <div className="md:pr-8 w-full md:w-7/12 h-7/12 md:h-auto">
            <ActivityStatistics activity={selectedActivity} />
          </div>

          <div className="bg-text w-px"></div>

          <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-2/12 h-2/12 md:h-auto min-h-0">
            <ActivityRecordHistoryList activityId={selectedActivity.id} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center md:pr-8 w-full md:w-9/12 h-9/12 md:h-auto">
          <div className="text-3xl md:text-5xl">select an activity</div>
        </div>
      )}

      <div className="bg-text md:w-px h-px md:h-auto" />

      <div className="flex flex-col md:pl-8 w-full md:w-3/12 h-3/12 md:h-auto min-h-0">
        <ActivitySelectList setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
      </div>
    </MainContainer>
  );
};
