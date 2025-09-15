import { useQuery } from "@tanstack/react-query";
import { getMe } from "./userServices";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    staleTime: Infinity,
    retry: false,
    enabled: !!localStorage.getItem("accessToken"),
  });
};
