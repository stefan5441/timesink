import { useNavigate } from "react-router-dom";
import { Button } from "../../components/styling/Button";

export const HomeLoggedOut = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Welcome to Timesink!</h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/login")}>Log in</Button>
        <Button onClick={() => navigate("/signup")}>Sign up</Button>
      </div>
    </div>
  );
};
