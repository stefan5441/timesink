import { CreateActivityPopover } from "@/components/functional/CreateActivityPopover";
import { LayoutWithSidebar } from "@/components/functional/LayoutWithSidebar";
import { MainContentContainer } from "@/components/functional/MainContentContainer";
import { RecordActivityPopover } from "@/components/functional/RecordActivityPopover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

type ActivityTab = "record" | "manage";

export const Activities = () => {
  const [tab, setTab] = useState<ActivityTab>("record");

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
          <TabsContent value="record" className="flex-1 flex flex-col justify-between items-center">
            <div className="flex-1 flex items-center justify-center text-2xl pb-8">
              Click the button to start recording an activity
            </div>
            <div className="self-center">
              <RecordActivityPopover />
            </div>
          </TabsContent>
          <TabsContent value="manage">
            <CreateActivityPopover />
          </TabsContent>
        </Tabs>
      </MainContentContainer>
    </LayoutWithSidebar>
  );
};
