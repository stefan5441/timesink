import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HomeLoggedOut = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Welcome to Timesink!</h1>
      <div className="flex gap-2">
        <Button size={"lg"} onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};
