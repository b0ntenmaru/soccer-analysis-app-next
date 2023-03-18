import type { NextApiRequest, NextApiResponse } from 'next';
import { connectSportmonksApiV3 } from '@/app/api/connectSportmonksApiV3';
import { Team } from '@/app/types/api_v3';

const { apiV3Path, apiKey } = connectSportmonksApiV3();

const getTeamById = async (args: { teamId: string; include?: Array<string> }): Promise<Team> => {
  const include = args.include?.join(';');

  const response = await fetch(
    `${apiV3Path}/teams/${args.teamId}?api_token=${apiKey}&include=${include};`
  );
  const res = await response.json();
  return res.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const teamId = req.query.team_id;

  if(typeof teamId === 'string') {
    const data = await getTeamById({ teamId, include: ['country', 'seasons', 'activeseasons'] });
    res.status(200).json(data);
  }
}
