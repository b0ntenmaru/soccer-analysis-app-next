"use client";
import { Avatar, Card, Col, Progress, Row, Select } from '@/app/components/antd';
import { GetSeasonStatsByIdData, League } from '@/app/types';
import styles from '@/app/leagues/[league_id]/page.module.css';
import { useMemo, useState } from 'react';

const getLeague = async () => {
  const res = await fetch('http://localhost:3000/api/leagues/2');
  const data = await res.json();
  return data as League;
};

const getLeagueSeasonStats = async (seasonId: number) => {
  const res = await fetch(`http://localhost:3000/api/seasons/${seasonId}/stats`);
  const data = await res.json();
  return data as GetSeasonStatsByIdData;
};

export default function Page() {
  const [league, setLeague] = useState<League | null>(null);
  const [seasonStats, setSeasonStats] = useState<GetSeasonStatsByIdData | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);

  getLeague().then((data) => {
    setLeague(data);
    setSelectedSeasonId(data.current_season_id);
    getLeagueSeasonStats(data.current_season_id).then((data) => {
      setSeasonStats(data);
    });
  });

  const seasonProgressPercentage = useMemo(()=> {
    if (seasonStats === null) { return; }

    const statsData = seasonStats.stats.data;
    return (statsData.number_of_matches_played / statsData.number_of_matches) * 100;
  }, [seasonStats]);

  return (
    <>
      {selectedSeasonId}
      <Row justify="space-between" style={{ marginBottom: '16px'}}>
        <Col span={24}>
          { league ? <Card bordered>
            <div className={styles.league_detail_header}>
              <div className={styles.league_profile}>
                <div>
                  <Avatar size={140} src={league.logo_path} />
                </div>
                <div className={styles.league_profile_sub}>
                  <div className={styles.league_country}>
                    <Avatar size={20} src={league.country.data.image_path} />
                    <span>{league.country.data.name}</span>
                  </div>
                  <div>
                    <Progress percent={30} />
                  </div>
                </div>
              </div>

              <div>
                <Select
                  defaultValue="lucy"
                  style={{ width: 140 }}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled' },
                  ]}
                />
              </div>
            </div>
          </Card>: <Card loading />}
        </Col>
      </Row>

      <Row justify="space-between">
        <Col span={7}>
          <Card bordered>
            col-4
          </Card>
        </Col>
        <Col span={16}>
          <Card bordered>
            col-4
          </Card>
        </Col>
      </Row>
    </>
  );
}
