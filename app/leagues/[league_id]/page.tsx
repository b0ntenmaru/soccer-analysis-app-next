"use client";

import { Avatar, Card, Col, Progress, Row, Select, Tabs, TabsProps } from '@/app/components/antd';
import { LeagueSeasonStats, League, SeasonStandings } from '@/app/types/api_v2';
import styles from '@/app/leagues/[league_id]/page.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getLeagueById } from '@/app/leagues/[league_id]/getLeagueById';
import { getSeasonStatsBySeasonId } from '@/app/leagues/[league_id]/getSeasonStatsBySeasonId';
import '@/app/leagues/[league_id]/antd_orverride.css';
import '@/app/leagues/[league_id]/page.css';
import TopPlayerRanking from './components/TopPlayerRanking';
import LeagueSeasonStatsComponent from './components/LeagueSeasonStats';
import { getStandingsBySeasonId } from './getStandingsBySeasonId';
import StandingsTable from './components/StandingsTable';

export default function Page({ params }: { params: { league_id: number }}) {
  const [league, setLeague] = useState<League | null>(null);
  const [seasonStats, setSeasonStats] = useState<LeagueSeasonStats | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [seasonStandings, setSeasonStandings] = useState<Array<SeasonStandings> | null>(null);

  useEffect(() => {
    getLeagueById(params.league_id).then((leagueData) => {
      setLeague(leagueData);
      setSelectedSeasonId(leagueData.current_season_id);
      getSeasonStatsBySeasonId(leagueData.current_season_id).then((seasonStatsData) => {
        setSeasonStats(seasonStatsData);
      });

      getStandingsBySeasonId(leagueData.current_season_id).then((seasonStandings) => {
        setSeasonStandings(seasonStandings);
      });
    });
  },[params.league_id]);

  const handleChangeSeason = (value: number) => {
    setSelectedSeasonId(value);
    getSeasonStatsBySeasonId(value).then((seasonStatsData) => {
      setSeasonStats(seasonStatsData);
    });
    getStandingsBySeasonId(value).then((seasonStandings) => {
      setSeasonStandings(seasonStandings);
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
                  size="large"
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
          {/* トップ選手 */}
          <Col span={24} md={7} style={{ marginBottom: '12px'}}>
            { seasonStats ? <TopPlayerRanking seasonStats={seasonStats} /> : <Card loading />}
          </Col>

          {/* 順位表 */}
          <Col span={24} md={16}>
            { seasonStandings ?
              (
                seasonStandings.map((seasonStandingsItem, i) => {
                  return <Card bordered key={i} style={{ marginBottom: '16px'}}>
                    <h1>{seasonStandingsItem.name}</h1>
                    <StandingsTable standingsData={seasonStandingsItem.standings.data} />
                  </Card>;
                })
              ): (
                <Card loading />
              )
            }
          </Col>
        </Row>
        :
        <Row justify="space-between">
          <Col span={24}>
            {seasonStats ? <Card bordered>
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold'}}>リーグスタッツ</h1>

                {/* スタッツ一覧 */}
                <Row gutter={10}>
                  <LeagueSeasonStatsComponent seasonStats={seasonStats} />
                </Row>
              </div>
            </Card>: <Card loading />}
          </Col>
        </Row>
      }
    </>
  );
}
