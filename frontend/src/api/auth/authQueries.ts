import { useNavigate } from "react-router-dom";
import { login, logout, register } from "./authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.clear();
      navigate("/");
    },
  });
}
