import { apiService } from "./api.service";
import type { League, LeaguesResponse } from "../models/league.model";
import type { Season, SeasonsResponse } from "../models/season.model";
import { sampleLeagues, sampleSeasons } from "../utils/sample";

export const fetchLeagues = async (): Promise<League[]> => {
  return sampleLeagues;
  // const data: LeaguesResponse = await apiService.get("/all_leagues.php");
  // return data.leagues;
};

export const fetchSeasonBadge = async (leagueId: string): Promise<Season[]> => {
  return sampleSeasons;
//   const data: SeasonsResponse = await apiService.get(
//     `/search_all_seasons.php?badge=1&id=${leagueId}`,
//   );
//   return data.seasons;
};
