import type { NextApiRequest, NextApiResponse } from 'next';
import { SeasonStandings } from '@/app/types';

const apiV1Path = process.env.API_V1_PATH;
const apiKey = process.env.API_KEY;

export const getStandingsBySeasonId = async (seasonId: number): Promise<Array<SeasonStandings>> => {
  const response: any = await fetch(`${apiV1Path}/standings/season/${seasonId}?api_token=${apiKey}&include=standings.team,`);
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
