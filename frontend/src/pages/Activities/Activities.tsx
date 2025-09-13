import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { colorMap } from "@/components/ui/custom/utils";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivities, useDeleteActivity } from "@/api/activity/activityQueries";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { RecordActivityPopover } from "@/components/functional/RecordActivityPopover";
import { CreateActivityPopover } from "@/components/functional/CreateActivityPopover";

type ActivityTab = "record" | "manage";

export const Activities = () => {
  const [tab, setTab] = useState<ActivityTab>("record");

  const { data: activitiesData } = useActivities();
  const deleteMutation = useDeleteActivity();

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

          {/* Record Tab */}
          <TabsContent value="record" className="flex-1 flex flex-col justify-between items-center">
            <div className="flex-1 flex items-center justify-center text-2xl pb-8">
              Click the button to start recording an activity
            </div>
            <div className="self-center">
              <RecordActivityPopover />
            </div>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="flex-1 flex flex-col justify-between pt-4">
            <div className="overflow-y-auto flex-1 space-y-2">
              {activitiesData && activitiesData.length > 0 ? (
                activitiesData.map((a) => (
                  <React.Fragment key={a.id}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded mr-2 ${colorMap[a.color]}`}></div>
                      <span className="flex-1">{a.name}</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="secondary" className="!py-1">
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="!py-1"
                          onClick={() => deleteMutation.mutate(a.id)}
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
