import { Team } from '@/app/types/api_v3';
import TeamUi from '@/app/teams/[team_id]/components/TeamUi';
import { getStandingsBySeasonId } from '@/app/leagues/[league_id]/getStandingsBySeasonId';

const getTeamById = async (teamId: number) => {
  const res = await fetch(`http://localhost:3000/api/v3/teams/${teamId}`);
  const data = await res.json();
  return data as Team;
};

export default async function Page({ params }: { params: { team_id: number }}) {
  const teamId = params.team_id;
  const team = await getTeamById(teamId);

  const teamRankingList = await Promise.all(team.activeseasons.map(async (season) => {
    return await getStandingsBySeasonId(season.id);
  }));

  return (
    <>
      <TeamUi team={team} teamRankingList={teamRankingList} />
    </>
  );
}
