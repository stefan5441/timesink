import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { MainContentContainer } from "@/components/functional/MainContentContainer";

export const ManageActivities = () => {
  return (
    <LayoutWithSidebar>
      <MainContentContainer className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Manage activities</h1>
          <p className="text-xs">Add, update or delete your activities</p>
        </div>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
