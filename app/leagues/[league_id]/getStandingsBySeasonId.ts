import { SeasonStandings } from "@/app/types";

export const getStandingsBySeasonId = async (seasonId: number) => {
  const res = await fetch(`http://localhost:3000/api/standings/${seasonId}`);
  const data = await res.json();
  return data as Array<SeasonStandings>;
};
