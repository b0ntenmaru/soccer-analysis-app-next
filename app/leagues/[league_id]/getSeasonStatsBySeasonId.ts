import { GetSeasonStatsByIdData } from '@/app/types';

export const getSeasonStatsBySeasonId = async (seasonId: number) => {
  const res = await fetch(`http://localhost:3000/api/seasons/${seasonId}/stats`);
  const data = await res.json();
  return data as GetSeasonStatsByIdData;
};
