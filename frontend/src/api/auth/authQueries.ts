import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "./authServices";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      navigate("/", { replace: true });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      navigate("/", { replace: true });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.setQueryData(["currentUser"], null);
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    },
  });
}
