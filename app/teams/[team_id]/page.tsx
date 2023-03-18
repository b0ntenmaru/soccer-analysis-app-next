import { Team } from '@/app/types';
import TeamUi from '@/app/teams/[team_id]/components/TeamUi';

const getTeamById = async (teamId: number) => {
  const res = await fetch(`http://localhost:3000/api/v3/teams/${teamId}`);
  const data = await res.json();
  return data as Team;
};

export default async function Page({ params }: { params: { team_id: number }}) {
  const teamId = params.team_id;
  const team = await getTeamById(teamId);

  return (
    <>
      <TeamUi team={team} />
    </>
  );
}
