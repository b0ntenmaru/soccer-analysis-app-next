"use client";
import { Team } from '@/app/types/api_v3';
import { Row, Col, Card, Avatar } from "antd";
import styles from '@/app/teams/[team_id]/page.module.css';
import { SeasonStandings } from '@/app/types';
import StandingsTable from '@/app/leagues/[league_id]/components/StandingsTable';

const TeamUi = (props: { team: Team, teamRankingList: Array<Array<SeasonStandings>> }) => {

  const { team, teamRankingList } = props;
  return (
    <>
      <Row justify="space-between" style={{ marginBottom: '16px'}}>
        <Col span={24}>
          <Card bordered>
            <div className={styles.team_detail_header}>
              <div className={styles.team_profile}>
                <div>
                  <Avatar size={140} src={team.image_path} shape="square" />
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h1>{team.name}</h1>
                  <div className={styles.team_country}>
                    <Avatar size={20} src={team.country.image_path} />
                    <span>{team.country.fifa_name}</span>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between">

          <Col span={24} md={7} style={{ marginBottom: '12px'}}>
            <Card bordered>
              {team.activeseasons.map(season => {
                return <div key={season.id}>{season.id}</div>;
              })}
            </Card>
          </Col>

          {/* 順位表 */}
          <Col span={24} md={16}>
            {teamRankingList.map((teamRanking => {
              return teamRanking.map((teamRankingItem, i) => {
                if(teamRankingItem.standings.data.some(d => d.team.data.id === team.id)) {
                  return <Card key={i} bordered style={{marginBottom: '16px'}}>
                    <h1>{teamRankingItem.standings.data[0].league.data.name}</h1>
                    <StandingsTable standingsData={teamRankingItem.standings.data} />
                  </Card>;
                }
              });
            }))}
          </Col>
        </Row>
    </>
  );
};

export default TeamUi;
