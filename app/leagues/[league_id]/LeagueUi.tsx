"use client";

import '@/app/leagues/[league_id]/antd_orverride.css';
import '@/app/leagues/[league_id]/page.css';
import { Avatar, Card, Col, Progress, Row, Select } from '@/app/components/antd';
import styles from '@/app/leagues/[league_id]/page.module.css';
import { LeagueSeasonStats, League, SeasonStandings } from '@/app/types/api_v2';
import { useMemo, useState } from 'react';
import LeagueSeasonStatsComponent from './components/LeagueSeasonStats';
import TopPlayerRanking from './components/TopPlayerRanking';
import StandingsTable from './components/StandingsTable';

const LeagueUi = (props: {
  league: League,
  seasonStats: LeagueSeasonStats,
  seasonStandings: Array<SeasonStandings>
}) => {

  const { league, seasonStats, seasonStandings } = props;

  const [selectedSeasonId, setSelectedSeasonId] = useState<number>(league.current_season_id);

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

  /**
   * TODO: シーズン変更時のロジック
   */
  const handleChangeSeason = (value: number) => {
    // setSelectedSeasonId(value);
    // getSeasonStatsBySeasonId(value).then((seasonStatsData) => {
    //   setSeasonStats(seasonStatsData);
    // });
    // getStandingsBySeasonId(value).then((seasonStandings) => {
    //   setSeasonStandings(seasonStandings);
    // });

    console.log(value);
  };

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: '16px'}}>
        <Col span={24}>
          <Card bordered>
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
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: '16px'}}>
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

      <Row justify="space-between">
        {/* トップ選手 */}
        <Col span={24} md={7} style={{ marginBottom: '12px'}}>
          { seasonStats ? <TopPlayerRanking seasonStats={seasonStats} /> : <Card loading />}
        </Col>

        {/* 順位表 */}
        <Col span={24} md={16}>
          {
            seasonStandings.map((seasonStandingsItem, i) => {
              return <Card bordered key={i} style={{ marginBottom: '16px'}}>
                <h1>{seasonStandingsItem.name}</h1>
                <StandingsTable standingsData={seasonStandingsItem.standings.data} />
              </Card>;
            })
          }
        </Col>
      </Row>
    </>
  );
};

export default LeagueUi;
