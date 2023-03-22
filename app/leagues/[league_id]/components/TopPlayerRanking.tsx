import { Avatar, Card, Radio } from '@/app/components/antd';
import { useState } from 'react';
import { GetSeasonStatsByIdData } from '@/app/types/api_v2';

const TopPlayerRanking = (props: {seasonStats: GetSeasonStatsByIdData} ) => {
  const { seasonStats } = props;
  const [selectedTopPlayerRanking, setSelectedTopPlayerRanking] = useState<'goal' | 'assist'>('goal');

  return (
    <Card bordered>
      <div>
        <h1 style={{fontSize: '18px'}}>トップ選手</h1>
        <div style={{textAlign: 'center', marginBottom: '8px'}}>
          <Radio.Group
            defaultValue={selectedTopPlayerRanking}
            buttonStyle="solid"
            size="small"
            onChange={
              (e) => setSelectedTopPlayerRanking(e.target.value)
            }
          >
            <Radio.Button value="goal">得点ランキング</Radio.Button>
            <Radio.Button value="assist">アシストランキング</Radio.Button>
          </Radio.Group>
        </div>
        {
        selectedTopPlayerRanking === 'goal' ?
          <div>
            {
              seasonStats.aggregatedGoalscorers.data.map((rankingItem, i) => {
                const {position, player} = rankingItem;

                return (
                  <ul key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px'}}>
                    <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}>
                      <span>
                        {position}
                      </span>
                      <span>
                        <Avatar src={player.data.image_path} />
                        {player.data.display_name}
                      </span>
                    </li>
                    <li>{rankingItem.goals}</li>
                  </ul>
                );
              })
            }
          </div>
          :
          <div>
            {
              seasonStats.aggregatedAssistscorers.data.map((rankingItem, i) => {
                const {position, player} = rankingItem;

                return (
                  <ul key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px'}}>
                    <li style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}>
                      <span>
                        {position}
                      </span>
                      <span>
                        <Avatar src={player.data.image_path} />
                        {player.data.display_name}
                      </span>
                    </li>
                    <li>{rankingItem.assists}</li>
                  </ul>
                );
              })
            }
          </div>
        }
      </div>
    </Card>
  );
};

export default TopPlayerRanking;
