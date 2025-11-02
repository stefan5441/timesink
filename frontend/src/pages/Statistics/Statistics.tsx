import { useState } from "react";
import type { Activity } from "@prisma/client";
import { ActivityStatistics } from "./ActivityStatistics";
import { MainContainer } from "@/components/MainContainer";
import { ActivitySelectList } from "../RecordActivity/ActivitySelectList";
import { ActivityRecordHistoryList } from "./ActivityRecordHistoryList";

export const Statistics = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  return (
    <MainContainer className="flex h-full min-h-0">
      {selectedActivity ? (
        <>
          <div className="w-7/12 pr-8">
            <ActivityStatistics activity={selectedActivity} />
          </div>

          <div className="w-px bg-text"></div>

          <div className="flex flex-col items-center w-2/12 min-h-0">
            <ActivityRecordHistoryList activityId={selectedActivity.id} />
          </div>
        </>
      ) : (
        <div className="w-9/12 pr-8 flex items-center justify-center">
          <div className="text-5xl">select an activity</div>
        </div>
      )}

      <div className="w-px bg-text"></div>

      <div className="w-3/12 pl-8 flex flex-col min-h-0">
        <ActivitySelectList setSelectedActivity={setSelectedActivity} selectedActivity={selectedActivity} />
      </div>
    </MainContainer>
  );
};
