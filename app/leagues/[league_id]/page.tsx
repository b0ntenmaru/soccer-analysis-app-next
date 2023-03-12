"use client";

import { Avatar, Card, Col, Progress, Row, Select, Statistic, Tabs, TabsProps } from '@/app/components/antd';
import { GetSeasonStatsByIdData, League } from '@/app/types';
import styles from '@/app/leagues/[league_id]/page.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getLeagueById } from '@/app/leagues/[league_id]/getLeagueById';
import { getSeasonStatsBySeasonId } from '@/app/leagues/[league_id]/getSeasonStatsBySeasonId';
import '@/app/leagues/[league_id]/antd_orverride.css';

export default function Page({ params }: { params: { league_id: number }}) {
  const [league, setLeague] = useState<League | null>(null);
  const [seasonStats, setSeasonStats] = useState<GetSeasonStatsByIdData | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);

  useEffect(() => {
    getLeagueById(params.league_id).then((leagueData) => {
      setLeague(leagueData);
      setSelectedSeasonId(leagueData.current_season_id);
      getSeasonStatsBySeasonId(leagueData.current_season_id).then((seasonStatsData) => {
        setSeasonStats(seasonStatsData);
      });
    });
  },[params.league_id]);

  const handleChangeSeason = (value: number) => {
    setSelectedSeasonId(value);
    getSeasonStatsBySeasonId(value).then((seasonStatsData) => {
      setSeasonStats(seasonStatsData);
    });
  };

  const seasonProgressPercentage = useMemo(()=> {
    if (seasonStats === null) { return; }

    const statsData = seasonStats.stats.data;
    return Math.round((statsData.number_of_matches_played / statsData.number_of_matches) * 100);
  }, [seasonStats]);

  const displaySeasons = useMemo(() => {
    if (league === null) {
      return;
    }
    const seasons =league.seasons.data.map(season => {
      return {
        value: season.id,
        label: season.name
      };
    });

    return seasons.reverse();

  }, [league]);

  const [selectedTab, setSelectedTab] = useState<'summary' | 'stats'>('summary');

  const tabItems: TabsProps['items'] = [
    {
      key: 'summary',
      label: `サマリー`,
    },
    {
      key: 'stats',
      label: `スタッツ`,
    },
  ];

  const seasonStatsData = useMemo(() => {
    return seasonStats?.stats.data;
  },[seasonStats?.stats.data]);

  const seasonStatsItems = useMemo((): Array<{ label: string; data: string | number | undefined;}> => {
    return [
      {
        label: '総得点数',
        data: seasonStatsData?.number_of_goals
      },
      {
        label: '1試合あたりの平均得点数',
        data: seasonStatsData?.avg_goals_per_match
      },
      {
        label: '1試合あたりのホーム平均得点数',
        data: seasonStatsData?.avg_homegoals_per_match
      },
      {
        label: '1試合あたりのアウェー平均得点数',
        data: seasonStatsData?.avg_awaygoals_per_match
      },
      {
        label: '1得点にかかる時間',
        data: `${seasonStatsData?.goal_scored_every_minutes}分`
      },
      {
        label: 'ホームチームの勝率',
        data: `${seasonStatsData?.win_percentage.home}%`
      },
      {
        label: 'アウェーチームの勝率',
        data: `${seasonStatsData?.win_percentage.away}%`
      },
      {
        label: '引き分け率',
        data: `${seasonStatsData?.draw_percentage}%`
      },
      {
        label: 'イエローカードの総数',
        data: `${seasonStatsData?.number_of_yellowcards}枚`
      },
      {
        label: '1試合あたりの平均イエローカード数',
        data: `${seasonStatsData?.avg_yellowcards_per_match}枚`
      },
      {
        label: '退場のきっかけとなるイエローカードの数',
        data: `${seasonStatsData?.number_of_yellowredcards}枚`
      },
      {
        label: '1試合あたりの退場のきっかけとなるイエローカード数の平均数',
        data: `${seasonStatsData?.avg_yellowredcards_per_match}枚`
      },
      {
        label: 'レッドカードの総数',
        data: `${seasonStatsData?.number_of_redcards}枚`
      },
      {
        label: '1試合あたりの平均レッドカード数',
        data: `${seasonStatsData?.avg_redcards_per_match}枚`
      }
    ];
  }, [seasonStatsData?.avg_awaygoals_per_match, seasonStatsData?.avg_goals_per_match, seasonStatsData?.avg_homegoals_per_match, seasonStatsData?.avg_redcards_per_match, seasonStatsData?.avg_yellowcards_per_match, seasonStatsData?.avg_yellowredcards_per_match, seasonStatsData?.draw_percentage, seasonStatsData?.goal_scored_every_minutes, seasonStatsData?.number_of_goals, seasonStatsData?.number_of_redcards, seasonStatsData?.number_of_yellowcards, seasonStatsData?.number_of_yellowredcards, seasonStatsData?.win_percentage.away, seasonStatsData?.win_percentage.home]);

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: '16px'}}>
        <Col span={24}>
          { league ? <Card bordered>
            <div className={styles.league_detail_header}>
              <div className={styles.league_profile}>
                <div>
                  <Avatar size={140} src={league.logo_path} shape="square" />
                </div>
                <div className={styles.league_profile_sub}>
                  <div className={styles.league_country}>
                    <Avatar size={20} src={league.country.data.image_path} />
                    <span>{league.country.data.name}</span>
                  </div>
                  <div>
                    <div style={{marginBottom: '-6px'}}>{seasonStats?.stats.data.number_of_matches_played} / {seasonStats?.stats.data.number_of_matches}試合が終了</div>
                    <Progress percent={seasonProgressPercentage} />
                  </div>
                </div>
              </div>

              <div>
                <Select
                  defaultValue={selectedSeasonId}
                  style={{ width: 140 }}
                  options={displaySeasons}
                  onChange={(e) => handleChangeSeason(e)}
                />
              </div>
            </div>
            <div style={{ marginTop: '6px'}}>
              <Tabs defaultActiveKey={selectedTab} size='large' items={tabItems} onChange={(key) => setSelectedTab(key as 'summary' | 'stats')} />
            </div>
          </Card>: <Card loading />}
        </Col>
      </Row>

      {selectedTab === 'summary' ?
        <Row justify="space-between">
          <Col span={24} md={7} style={{ marginBottom: '12px;'}}>
            <Card bordered>
              summary
            </Card>
          </Col>
          <Col span={24} md={16}>
            <Card bordered>
              col-4
            </Card>
          </Col>
        </Row>
        :
        <Row justify="space-between">
          <Col span={24}>
            <Card bordered>
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold'}}>リーグスタッツ</h1>

                {/* スタッツ一覧 */}
                <Row gutter={10}>
                  {seasonStatsItems.map(((seasonStatsItem, i) => {
                    return <Col span={12} md={6} key={i} style={{ marginBottom: '8px'}}>
                      <Statistic title={seasonStatsItem.label} value={seasonStatsItem.data} />
                    </Col>;
                  }))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      }
    </>
  );
}
