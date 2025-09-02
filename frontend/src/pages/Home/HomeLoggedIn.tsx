import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { MdFiberManualRecord } from "react-icons/md";

import { getMe } from "../../api/userServices";
import { Text } from "../../components/styling/Text";
import { Header } from "../../components/styling/Header";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/styling/Container";
// import { ActivityCard } from "../../components/styling/ActivityCard";

export const HomeLoggedIn = () => {
  const { data: userData } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  const today = new Date();
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = today.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

  const formattedDate = `${weekday}, ${dayMonth}`;
  return (
    <>
      <Container size="medium" className="flex flex-col justify-between min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Header content={`Hi, ${userData?.username}`} size="medium" bold />
            <Text content={formattedDate} size="small" />
          </div>

          <Button>
            <CgProfile />
          </Button>
        </div>

        {/* <div>
          <Header content={"Recent activities"} size="medium" bold />
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
            <ActivityCard
              activityName={"Competitive Programming"}
              activityLengthInSeconds={2000}
              activityColor="PURPLE"
            />
            <ActivityCard activityName={"Running"} activityLengthInSeconds={6283} activityColor="BLUE" />
            <ActivityCard
              activityName={"Competitive Programming"}
              activityLengthInSeconds={2322}
              activityColor="PURPLE"
            />
          </div>
        </div> */}

        <div className="flex justify-center gap-2">
          <Button>
            <MdFiberManualRecord /> Record an activity
          </Button>
          <Button>
            <FaPlus /> New activity
          </Button>
        </div>
      </Container>
    </>
  );
};
