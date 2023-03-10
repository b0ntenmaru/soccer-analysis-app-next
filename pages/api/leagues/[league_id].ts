import type { NextApiRequest, NextApiResponse } from 'next';
import type { League } from '@/app/types';

const apiV1Path = process.env.API_V1_PATH;
const apiKey = process.env.API_KEY;

const getLeagueById = async (args: { leagueId: string; include?: Array<string> }): Promise<League> => {
  const include = args.include?.join(',');

  const response = await fetch(
    `${apiV1Path}/leagues/${args.leagueId}?api_token=${apiKey}&include=${include}`
  );
  const res = await response.json();
  return res.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const leagueId = req.query.league_id;

  if(typeof leagueId === 'string') {
    const data = await getLeagueById({ leagueId, include: ['seasons', 'country'] });
    res.status(200).json(data);
  }
}
