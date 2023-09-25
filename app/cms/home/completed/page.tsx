'use client';
import CmsAPI from '@/api/cms';
import { MatchObjectI } from '@/utils/interface';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

export default function Completed() {
  const [datas, setDatas] = useState<MatchObjectI[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: 'Match ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tournament Name',
      dataIndex: 'tournament_names',
      key: 'tournament_names',
    },
    {
      title: 'Game',
      dataIndex: 'game_names',
      key: 'game_names',
    },
    {
      title: 'Team A',
      dataIndex: 'team_a_names',
      key: 'team_a_names',
    },
    {
      title: ' A Odds',
      dataIndex: 'team_a_odds',
      key: 'team_a_odds',
    },
    {
      title: 'Team B',
      dataIndex: 'team_b_names',
      key: 'team_b_names',
    },

    {
      title: ' B Odds',
      dataIndex: 'team_b_odds',
      key: 'team_b_odds',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Match Link',
      dataIndex: 'match_link',
      key: 'match_link',
      render: (match_link: string) => (
        <div className="max-w-[150px]">{match_link}</div>
      ),
    },
  ];

  const getAllMatch = async () => {
    try {
      setLoading(true);
      const { data } = await CmsAPI.getCompletedMatches();
      const newMap = data.map((d) => ({
        ...d,
        key: d.id,
      }));
      setDatas(newMap);
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMatch();
  }, []);
  return (
    <div className="p-[50px]">
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600] text-black">Completed Match</h1>
        </div>
      </div>
      <div>
        <Table loading={loading} dataSource={datas} columns={columns} />
      </div>
    </div>
  );
}
