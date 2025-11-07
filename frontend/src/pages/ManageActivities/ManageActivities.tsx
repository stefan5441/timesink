import { useState } from "react";
import { ActivitiesList } from "./ActivitiesList";
import { MainContainer } from "@/components/MainContainer";
import { CreateEditActivityForm } from "./CreateEditActivityForm";

export const ManageActivities = () => {
  const [activityIdToEdit, setActivityIdToEdit] = useState<string>();

  return (
    <MainContainer className="flex md:flex-row flex-col h-full min-h-0">
      <div className="flex flex-col mb-8 md:mb-0 md:pr-8 md:w-8/12 h-6/12 md:h-auto min-h-0">
        <ActivitiesList setActivityIdToEdit={setActivityIdToEdit} />
      </div>

      <div className="flex-shrink-0 bg-text w-full md:w-px h-px md:h-auto" />

      <div className="flex flex-col justify-center md:justify-start mt-6 md:mt-0 md:pl-8 md:w-4/12 h-6/12 md:h-auto">
        <CreateEditActivityForm activityId={activityIdToEdit} onCancel={() => setActivityIdToEdit(undefined)} />
      </div>
    </MainContainer>
  );
};
