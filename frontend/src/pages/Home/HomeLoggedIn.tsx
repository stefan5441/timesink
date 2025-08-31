import { getMe } from "../../api/userServices";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/styling/Header";
import { Text } from "../../components/styling/Text";
import { Container } from "../../components/styling/Container";
import { Button } from "../../components/styling/Button";
import { CgProfile } from "react-icons/cg";
import { ActivityCard } from "../../components/styling/ActivityCard";
import { FaPlay, FaPlus } from "react-icons/fa";

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
    <Container size="medium" className="flex flex-col justify-between min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Header content={`Hi, ${userData?.username}`} size="medium" bold />
          <Text content={formattedDate} size="small" />
        </div>

        <Button icon={CgProfile} />
      </div>

      <div>
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
      </div>

      <div className="flex justify-center gap-2">
        <Button icon={FaPlay} content="Record an activity" size="medium" />
        <Button icon={FaPlus} content="Add new activity" size="medium" />
      </div>
    </Container>
  );
};
