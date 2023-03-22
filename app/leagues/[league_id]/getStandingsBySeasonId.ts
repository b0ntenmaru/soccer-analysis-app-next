import { SeasonStandings } from "@/app/types/api_v2";

export const getStandingsBySeasonId = async (seasonId: number) => {
  const res = await fetch(`http://localhost:3000/api/v2/standings/${seasonId}`);
  const data = await res.json();
  return data as Array<SeasonStandings>;
};
