import { useQuery } from "@tanstack/react-query";
import { fetchSeasonBadge } from "../services/league.service";

export const useSeasonBadge = (leagueId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["seasonBadge", leagueId],
    queryFn: () => fetchSeasonBadge(leagueId),
    enabled,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};
