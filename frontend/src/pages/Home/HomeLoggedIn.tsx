import { getMe } from "@/api/userServices";
import { useQuery } from "@tanstack/react-query";
import { ActivityCard } from "@/components/ui/custom/ActivityCard";
import { MainSidebar } from "@/components/functional/MainSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export const HomeLoggedIn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  const today = new Date();
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = today.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const formattedDate = `${weekday}, ${dayMonth}`;

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <MainSidebar />
      <div className="px-8 py-6 flex flex-col justify-between min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{`Hi, ${userData?.username}`}</h1>
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Recent activities</h3>
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4">
            <ActivityCard
              activityName="Competitive Programming"
              activityLengthInSeconds={2000}
              activityColor="PURPLE"
            />
            <ActivityCard activityName="Running" activityLengthInSeconds={6283} activityColor="BLUE" />
            <ActivityCard
              activityName="Competitive Programming"
              activityLengthInSeconds={2322}
              activityColor="PURPLE"
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
