import type { NextApiRequest, NextApiResponse } from 'next';
import { SeasonStandings } from '@/app/types';
import { connectSportmonksApiV2 } from '@/app/api/connectSportmonksApiV2';

const { apiV2Path, apiKey } = connectSportmonksApiV2();

export const getStandingsBySeasonId = async (seasonId: number): Promise<Array<SeasonStandings>> => {
  const response: any = await fetch(`${apiV2Path}/standings/season/${seasonId}?api_token=${apiKey}&include=standings.team,standings.league`);
  const resJson = await response.json();
  return resJson.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const seasonId = req.query.season_id;

  if(typeof seasonId === 'string') {
    const data = await getStandingsBySeasonId(Number(seasonId));
    res.status(200).json(data);
  }
}
