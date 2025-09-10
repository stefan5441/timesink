import { useLocation } from "react-router-dom";

import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { MainContentContainer } from "@/components/functional/MainContentContainer";

export const RecordActivity = () => {
  const location = useLocation();
  const activityId = location.state?.activityId ?? null;

  if (!activityId) {
    return (
      <LayoutWithSidebar>
        <MainContentContainer className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">No activities</h1>
            <p className="text-xs">No current activities to record, please select an activity to start recording</p>
          </div>
        </MainContentContainer>
      </LayoutWithSidebar>
    );
  }

  return (
    <LayoutWithSidebar>
      <MainContentContainer className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">RECORD ACTIVITY</h1>
          <p className="text-xs">RECORD ACTIVITY DESCRIPTION</p>
        </div>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
