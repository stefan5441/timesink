import { HomeLoggedIn } from "./HomeLoggedIn";
import { HomeLoggedOut } from "./HomeLoggedOut";
import { useCurrentUser } from "@/api/user/userQueries";

export const Home = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  return user ? <HomeLoggedIn /> : <HomeLoggedOut />;
};
