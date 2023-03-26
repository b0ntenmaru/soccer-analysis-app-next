import LeagueUi from '@/app/leagues/[league_id]/LeagueUi';
import { getLeagueById } from '@/app/leagues/[league_id]/getLeagueById';
import { getSeasonStatsBySeasonId } from '@/app/leagues/[league_id]/getSeasonStatsBySeasonId';
import { getStandingsBySeasonId } from './getStandingsBySeasonId';

export default async function Page({ params }: { params: { league_id: number }}) {
  const league = await getLeagueById(params.league_id);
  const seasonStats = await getSeasonStatsBySeasonId(league.current_season_id);
  const seasonStandings = await getStandingsBySeasonId(league.current_season_id);

  return (
    <LeagueUi
      league={league}
      seasonStats={seasonStats}
      seasonStandings={seasonStandings}
    />
  );
}
