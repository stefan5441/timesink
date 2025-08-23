import { useAuth } from "../../auth/useAuth";
import { HomeLoggedIn } from "./HomeLoggedIn";
import { HomeLoggedOut } from "./HomeLoggedOut";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomeLoggedIn /> : <HomeLoggedOut />;
};
