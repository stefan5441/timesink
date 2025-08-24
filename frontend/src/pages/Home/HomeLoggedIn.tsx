import { getMe } from "../../api/userServices";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/styling/Header";

export const HomeLoggedIn = () => {
  const { data } = useQuery({
    queryKey: ["HomeLoggedInUser"],
    queryFn: getMe,
  });

  console.log("data", data);

  return (
    <div className="flex">
      <Header content="Welcome to TimeSink" size="large" />
    </div>
  );
};
