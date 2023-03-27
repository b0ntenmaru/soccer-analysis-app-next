import LeagueUi from '@/app/leagues/[league_id]/LeagueUi';
import { getLeagueById } from '@/app/leagues/[league_id]/getLeagueById';
import { getSeasonStatsBySeasonId } from '@/app/leagues/[league_id]/getSeasonStatsBySeasonId';
import { getStandingsBySeasonId } from './getStandingsBySeasonId';

export default async function Page({
  params,
  searchParams
}: {
  params: { league_id: number },
  searchParams?: { season_id?: number}})
{
  const selectedSeasonId = (leagueCurrentSeasonId: number) => {
    if (searchParams && searchParams.season_id) {
      return searchParams.season_id;
    }

    return leagueCurrentSeasonId;
  };

  const league = await getLeagueById(params.league_id);
  const seasonId = selectedSeasonId(league.current_season_id);
  const seasonStats = await getSeasonStatsBySeasonId(seasonId);
  const seasonStandings = await getStandingsBySeasonId(seasonId);

  return (
    <LeagueUi
      league={league}
      seasonStats={seasonStats}
      seasonStandings={seasonStandings}
    />
  );
}
