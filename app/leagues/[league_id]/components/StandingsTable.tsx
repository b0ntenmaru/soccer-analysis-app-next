import { Avatar, Tooltip } from "@/app/components/antd";
import { Standings } from "@/app/types";
import styles from '@/app/leagues/[league_id]/components/StandingsTable.module.css';

const StandingsTable = (props: { standingsData: Array<Standings>}) => {
  const { standingsData } = props;

  return (
    <table style={{width: '100%'}}>
      <thead>
        <tr>
          <th style={{textAlign: 'left'}}>#</th>
          <th style={{width: '40%', textAlign: 'left'}}>チーム名</th>
          <th style={{textAlign: 'left'}}>試合数</th>
          <th style={{textAlign: 'left'}}>勝</th>
          <th style={{textAlign: 'left'}}>分</th>
          <th style={{textAlign: 'left'}}>負</th>
          <th style={{textAlign: 'left'}} className={styles.mobile_display_none}>得:失</th>
          <th style={{textAlign: 'left'}}>Pts</th>
          <th style={{textAlign: 'left'}} className={styles.mobile_display_none}>直近5試合</th>
        </tr>
      </thead>
      <tbody>
        {standingsData.map((standings, i) => {
          return <tr key={i} className={styles.standings_table_row}>
            <td>
              <Position result={standings.result} position={standings.position} />
            </td>
            <td>
              <Avatar src={standings.team.data.logo_path} size='small' />
              {standings.team.data.name}
            </td>
            <td>{standings.overall.games_played}</td>
            <td>{standings.overall.won}</td>
            <td>{standings.overall.draw}</td>
            <td>{standings.overall.lost}</td>
            <td className={styles.mobile_display_none}>{standings.overall.goals_scored}:{standings.overall.goals_against}</td>
            <td>{standings.points}</td>
            <td className={styles.td_recent_form}><RecentForm recentForm={standings.recent_form} /></td>
          </tr>;
        })}
      </tbody>
    </table>
  );
};

const Position = (props: {result: string | null, position: number}) => {
  const {result, position} = props;

  if (result === 'UEFA Champions League' || result === '8th Finals') {
    return <Tooltip title="UEFA Champions League">
      <span className={styles.champions_league}>
        {position}
      </span>
    </Tooltip>;
  } else if (result === 'UEFA Europa League') {
    return <Tooltip title="UEFA Europa League">
      <span className={styles.europa_league}>{position}</span>
    </Tooltip>;
  } else if (result === 'Relegation') {
    return <Tooltip title="UEFA Europa League">
      <span className={styles.relegation}>{position}</span>
    </Tooltip>;
  } else {
    return <span className={styles.position}>{position}</span>;
  }
};

const RecentForm = (props: {recentForm: string}) => {
  const convertedValueArray = props.recentForm.split('');

  return <>
    {
      convertedValueArray.map((value, i) => {
        if(value === 'W') {
          return <span key={i} className={styles.recent_form_item} style={{background: 'rgb(21, 177, 104)'}}>
            W
          </span>;
        } else if (value === 'D') {
          return <span key={i} className={styles.recent_form_item} style={{background: 'rgb(199, 54, 31)'}}>D</span>;
        } else {
          return <span key={i} className={styles.recent_form_item} style={{background: 'rgb(164, 169, 179)'}}>{value}</span>;
        }
      })
    }
  </>;
};


export default StandingsTable;
