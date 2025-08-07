import { useAuth } from "../../auth/useAuth";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomeLoggedIn /> : <HomeLoggedOut />;
}

export default Home;
