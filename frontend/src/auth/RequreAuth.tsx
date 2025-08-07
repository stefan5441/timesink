// src/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "./useAuth";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
