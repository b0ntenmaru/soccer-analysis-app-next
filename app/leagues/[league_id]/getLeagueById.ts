
import { League } from '@/app/types';

export const getLeagueById = async (leagueId: number) => {
  const res = await fetch(`http://localhost:3000/api/v2/leagues/${leagueId}`);
  const data = await res.json();
  return data as League;
};
