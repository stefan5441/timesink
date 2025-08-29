import { getMe } from "../../api/userServices";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/styling/Header";
import { Text } from "../../components/styling/Text";
import { Container } from "../../components/styling/Container";
import { Button } from "../../components/styling/Button";
import { CgProfile } from "react-icons/cg";

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
    <Container size="medium">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Header content={`Hi, ${userData?.username}`} size="medium" bold />
          <Text content={formattedDate} size="small" />
        </div>
        <Button size="medium" square>
          <CgProfile className="text-zinc-800" />
        </Button>
      </div>
    </Container>
  );
};
