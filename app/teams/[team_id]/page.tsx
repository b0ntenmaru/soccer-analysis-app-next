import '@/app/leagues/[league_id]/antd_orverride.css';
import '@/app/leagues/[league_id]/page.css';


export default function Page({ params }: { params: { team_id: number }}) {
  const teamId = params.team_id;

  return (
    <>
      teamId: {teamId}
    </>
  );
}
