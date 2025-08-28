import { getMe } from "../../api/userServices";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/styling/Header";
import { Text } from "../../components/styling/Text";
import { Container } from "../../components/styling/Container";

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
      <div className="flex flex-col">
        <Header content={`Hi, ${userData?.username}`} size="medium" bold />
        <Text content={formattedDate} size="small" />
      </div>
    </Container>
  );
};
