import { Col, Statistic } from "@/app/components/antd";
import { LeagueSeasonStats } from "@/app/types/api_v2";
import { useMemo } from "react";

const LeagueSeasonStats = (props: { seasonStats: LeagueSeasonStats }) => {
  const { seasonStats } = props;

  const seasonStatsData = useMemo(() => {
    return seasonStats.stats.data;
  },[seasonStats.stats.data]);

  const seasonStatsItems = useMemo((): Array<{ label: string; data: string | number | undefined;}> => {
    return [
      {
        label: '総得点数',
        data: seasonStatsData.number_of_goals
      },
      {
        label: '1試合あたりの平均得点数',
        data: seasonStatsData.avg_goals_per_match
      },
      {
        label: '1試合あたりのホーム平均得点数',
        data: seasonStatsData.avg_homegoals_per_match
      },
      {
        label: '1試合あたりのアウェー平均得点数',
        data: seasonStatsData.avg_awaygoals_per_match
      },
      {
        label: '1得点にかかる時間',
        data: `${seasonStatsData.goal_scored_every_minutes}分`
      },
      {
        label: 'ホームチームの勝率',
        data: `${seasonStatsData.win_percentage.home}%`
      },
      {
        label: 'アウェーチームの勝率',
        data: `${seasonStatsData.win_percentage.away}%`
      },
      {
        label: '引き分け率',
        data: `${seasonStatsData.draw_percentage}%`
      },
      {
        label: 'イエローカードの総数',
        data: `${seasonStatsData.number_of_yellowcards}枚`
      },
      {
        label: '1試合あたりの平均イエローカード数',
        data: `${seasonStatsData.avg_yellowcards_per_match}枚`
      },
      {
        label: '退場のきっかけとなるイエローカードの数',
        data: `${seasonStatsData.number_of_yellowredcards}枚`
      },
      {
        label: '1試合あたりの退場のきっかけとなるイエローカード数の平均数',
        data: `${seasonStatsData.avg_yellowredcards_per_match}枚`
      },
      {
        label: 'レッドカードの総数',
        data: `${seasonStatsData.number_of_redcards}枚`
      },
      {
        label: '1試合あたりの平均レッドカード数',
        data: `${seasonStatsData.avg_redcards_per_match}枚`
      }
    ];
  }, [seasonStatsData.avg_awaygoals_per_match, seasonStatsData.avg_goals_per_match, seasonStatsData.avg_homegoals_per_match, seasonStatsData.avg_redcards_per_match, seasonStatsData.avg_yellowcards_per_match, seasonStatsData.avg_yellowredcards_per_match, seasonStatsData.draw_percentage, seasonStatsData.goal_scored_every_minutes, seasonStatsData.number_of_goals, seasonStatsData.number_of_redcards, seasonStatsData.number_of_yellowcards, seasonStatsData.number_of_yellowredcards, seasonStatsData.win_percentage.away, seasonStatsData.win_percentage.home]);

  return (
    <>
      {seasonStatsItems.map(((seasonStatsItem, i) => {
        return <Col span={12} md={6} key={i} style={{ marginBottom: '8px'}}>
          <Statistic title={seasonStatsItem.label} value={seasonStatsItem.data} />
        </Col>;
      }))}
    </>
  );
};

export default LeagueSeasonStats;
