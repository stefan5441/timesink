import { useCurrentUser } from "@/api/user/userQueries";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
