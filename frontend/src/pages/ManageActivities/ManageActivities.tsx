import { useState } from "react";
import { ActivitiesList } from "./ActivitiesList";
import { MainContainer } from "@/components/MainContainer";
import { CreateEditActivityForm } from "./CreateEditActivityForm";

export const ManageActivities = () => {
  const [activityIdToEdit, setActivityIdToEdit] = useState<string>();

  return (
    <MainContainer className="flex h-full min-h-0">
      <div className="w-8/12 pr-8 flex flex-col min-h-0">
        <ActivitiesList setActivityIdToEdit={setActivityIdToEdit} />
      </div>

      <div className="w-px bg-text"></div>

      <div className="w-4/12 pl-8">
        <CreateEditActivityForm activityId={activityIdToEdit} onCancel={() => setActivityIdToEdit(undefined)} />
      </div>
    </MainContainer>
  );
};
