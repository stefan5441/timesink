import { useState } from "react";
import { useActivities, useDeleteActivity } from "@/api/activity/activityQueries";
import { LoadingOrError } from "@/components/LoadingOrError";
import { borderColorMap } from "@/components/utils";

type Props = {
  setActivityIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ActivitiesList = ({ setActivityIdToEdit }: Props) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | undefined>();

  const { data: activitiesData, isLoading, isError } = useActivities();
  const deleteActivityMutation = useDeleteActivity();

  if (isLoading || isError) {
    return <LoadingOrError isError={isError} isLoading={isLoading} />;
  }

  const handleEdit = (id: string) => {
    setConfirmDeleteId(undefined);
    setActivityIdToEdit(id);
  };

  const handleDelete = (id: string) => {
    setConfirmDeleteId(undefined);
    setActivityIdToEdit(undefined);
    deleteActivityMutation.mutate(id);
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
    setActivityIdToEdit(undefined);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(undefined);
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      {activitiesData &&
        activitiesData.length > 0 &&
        activitiesData.map((a) => (
          <div className="flex justify-between items-center" key={a.id}>
            <div className={`text-2xl md:text-4xl border-b-4 ${borderColorMap[a.color]}`}>{a.name}</div>
            {confirmDeleteId === a.id ? (
              <div className="flex items-center gap-1 md:gap-4">
                <span className="text-xl md:text-3xl">are you sure?</span>
                <button
                  className="hover:text-primary text-xl md:*:text-3xl transition-all duration-150"
                  onClick={() => handleDelete(a.id)}
                >
                  yes
                </button>
                <span className="text-xl md:text-3xl">/</span>
                <button
                  className="hover:text-danger text-xl md:text-3xl transition-all duration-150"
                  onClick={handleCancelDelete}
                >
                  no
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="hover:text-primary text-xl md:text-3xl transition-all duration-150"
                  onClick={() => handleEdit(a.id)}
                >
                  edit
                </button>
                <button
                  onClick={() => handleDeleteClick(a.id)}
                  className="hover:text-danger text-xl md:text-3xl transition-all duration-150"
                >
                  delete
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
