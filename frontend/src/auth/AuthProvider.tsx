import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("accessToken");
  });

  useEffect(() => {
    function onStorage() {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  const setAuthenticated = (value: boolean) => setIsAuthenticated(value);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
