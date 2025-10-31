import { HomeLoggedIn } from "./HomeLoggedIn";
import { Login } from "../Authentication/Login";
import { useCurrentUser } from "@/api/user/userQueries";
import { Loading } from "@/components/Loading";

export const Home = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  return user ? <HomeLoggedIn /> : <Login />;
};
