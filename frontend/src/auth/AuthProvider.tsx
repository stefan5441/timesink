import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    axios
      .get("/auth/me")
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
