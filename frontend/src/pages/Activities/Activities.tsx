import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/contexts/timer/useTimer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditActivityPopover } from "@/components/functional/EditActivityPopover";
import { useActivities, useDeleteActivity } from "@/api/activity/activityQueries";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { RecordActivityPopover } from "@/components/functional/RecordActivityPopover";
import { CreateActivityPopover } from "@/components/functional/CreateActivityPopover";
import { bgColorMap, borderColorMap, textColorMap } from "@/components/ui/custom/utils";
import { useCreateActivityRecord } from "@/api/activityRecord/activityRecordQueries";

type ActivityTab = "record" | "manage";

export const Activities = () => {
  const [tab, setTab] = useState<ActivityTab>("record");

  const { secondsElapsed, startTimer, activeActivityId, stopTimer } = useTimer();

  const { data: activitiesData } = useActivities();
  const deleteActivityMutation = useDeleteActivity();

  const createActivityRecordMutation = useCreateActivityRecord();

  const activeActivity = activitiesData?.find((a) => a.id === activeActivityId);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secs % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStopActivity = () => {
    if (!activeActivity?.id) return;

    createActivityRecordMutation.mutate({ activityId: activeActivity.id, lengthInSeconds: secondsElapsed });
    stopTimer();
  };

  return (
    <LayoutWithSidebar>
      <MainContentContainer className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">
          Activities - {tab === "record" ? "Record an activity" : "Manage activities"}
        </h1>

        <Tabs value={tab} onValueChange={(newTab) => setTab(newTab as ActivityTab)} className="h-full">
          <TabsList>
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="record" className="flex-1 flex flex-col justify-between items-center gap-4">
            {activeActivity ? (
              <Card className={`w-80 h-80 flex items-center justify-center ${borderColorMap[activeActivity.color]}`}>
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl">{formatTime(secondsElapsed)}</div>
                  <div className={`mt-2 text-xl ${textColorMap[activeActivity.color]}`}>{activeActivity.name}</div>
                </CardContent>
              </Card>
            ) : (
              <div className="w-80 h-80 flex items-center justify-center text-2xl text-center">
                Click the button to start recording an activity
              </div>
            )}

            <div className="self-center">
              {activeActivity ? (
                <Button size={"sm"} className={`${bgColorMap[activeActivity.color]}`} onClick={handleStopActivity}>
                  Stop activity
                </Button>
              ) : (
                <RecordActivityPopover handleStartActivity={startTimer} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="manage" className="flex-1 flex flex-col justify-between pt-4">
            <div className="overflow-y-auto flex-1 space-y-2">
              {activitiesData && activitiesData.length > 0 ? (
                activitiesData.map((a) => (
                  <React.Fragment key={a.id}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded mr-2 ${bgColorMap[a.color]}`}></div>
                      <span className="flex-1">{a.name}</span>
                      <div className="space-x-2">
                        <EditActivityPopover activityId={a.id} disabled={a.id === activeActivity?.id} />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="!py-1"
                          onClick={() => deleteActivityMutation.mutate(a.id)}
                          disabled={a.id === activeActivity?.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </React.Fragment>
                ))
              ) : (
                <div className="text-xl">
                  You have no added activities, add an activity by clicking the button below
                </div>
              )}
            </div>

            <div className="self-center mt-4">
              <CreateActivityPopover />
            </div>
          </TabsContent>
        </Tabs>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
