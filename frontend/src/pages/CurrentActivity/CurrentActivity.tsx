import { useLocation } from "react-router-dom";

export const CurrentActivity = () => {
  const location = useLocation();
  const activityId = location.state?.activityId ?? null;

  if (!activityId) {
    return <div className="flex">No current activities to record</div>;
  }

  return <div>CURRENT ACTIVITY</div>;
};
