import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
