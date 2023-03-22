import type { NextApiRequest, NextApiResponse } from 'next';
import { GetSeasonStatsByIdData } from '@/app/types/api_v2';
import { connectSportmonksApiV2 } from '@/app/api/connectSportmonksApiV2';

const { apiV2Path, apiKey } = connectSportmonksApiV2();

const getSeasonStatsById = async (args: { seasonId: string }): Promise<GetSeasonStatsByIdData> => {
  type StatsQuery = `stats.${string}`;
  const aggregatedGoalscorersQuery = 'aggregatedGoalscorers:limit(10|1).player.team';
  const aggregatedAssistscorersQuery = 'aggregatedAssistscorers:limit(10|1).player.team';
  const mostGoalsTeam: StatsQuery = 'stats.mostgoalsteam';
  const mostGoalsPerMatchTeam: StatsQuery = 'stats.mostgoalspermatchteam';
  const mostConcededGoalsTeam: StatsQuery = 'stats.mostconcededgoalsteam';
  const mostgoalspermatchteam: StatsQuery = 'stats.mostgoalspermatchteam';
  const mostcleansheetsteam: StatsQuery = 'stats.mostcleansheetsteam';
  const mostCornersTeam: StatsQuery = 'stats.mostcornersteam';
  const topScorer: StatsQuery = 'stats.topscorer';
  const assistTopScorer: StatsQuery = 'stats.assisttopscorer';
  const mostcleansheetsgoalkeeper: StatsQuery = 'stats.mostcleansheetsgoalkeeper';

const includeQuery = `stats,${aggregatedGoalscorersQuery},${aggregatedAssistscorersQuery},${mostGoalsTeam},${mostGoalsPerMatchTeam},${mostConcededGoalsTeam},${mostgoalspermatchteam},${mostcleansheetsteam},${mostCornersTeam},${topScorer},${assistTopScorer},${mostcleansheetsgoalkeeper}`;

  const { seasonId } = args;

  const response: any = await fetch(
    `${apiV2Path}/seasons/${seasonId}?api_token=${apiKey}&include=${includeQuery}`
  );
  const responseJson = await response.json();
  return responseJson.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const seasonId = req.query.season_id;

  if(typeof seasonId === 'string') {
    const data = await getSeasonStatsById({ seasonId });
    res.status(200).json(data);
  }
}
