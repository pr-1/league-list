import { useQuery } from "@tanstack/react-query";
import { fetchLeagues } from "../services/league.service";

export const useLeagues = () => {
  return useQuery({
    queryKey: ["leagues"],
    queryFn: fetchLeagues,
    staleTime: 10 * 60 * 1000,
  });
};
