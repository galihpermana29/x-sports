'use client';
import CmsAPI from '@/api/cms';
import { MatchObjectI } from '@/utils/interface';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

export default function Ongoing() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<MatchObjectI[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<{
    game: { label: string; value: number }[];
    team: { label: string; value: number }[];
  }>();

  const handleOk = () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      try {
        const { date } = value;
        const payload = { ...value, date: dayjs(date).format('DD MMMM YYYY') };
        await CmsAPI.createMatch(payload);
        getAllMatch();
        setIsModalOpen(false);
      } catch (error) {
        const axiosError = error as AxiosError; // Cast error to AxiosError
        const responseData = axiosError.response?.data as
          | { errors: string[] }
          | undefined;
        const err = responseData
          ? responseData?.errors[0]
          : 'Ouch, an error happen!';

        message.error(err);
      }
    });
  };

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

    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: () => <Button>End Match</Button>,
    },
  ];

  const getAllMatch = async () => {
    try {
      setLoading(true);
      const { data } = await CmsAPI.getMatches();
      const { data: dataGame } = await CmsAPI.getGames();
      const { data: dataTeam } = await CmsAPI.getTeams();
      const newMapGame = dataGame.map((d) => ({
        label: d.game_names,
        value: d.id,
      }));
      const newMapTeam = dataTeam.map((d) => ({
        label: d.team_names,
        value: d.id,
      }));
      const newMap = data.map((d) => ({
        ...d,
        key: d.id,
      }));
      setSelectData({ game: newMapGame, team: newMapTeam });
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
      <Modal
        title="Add New Match"
        okText={'Add'}
        okButtonProps={{
          className: 'bg-black text-white',
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" className="my-[20px]" form={form}>
          <Form.Item
            rules={[
              { required: true, message: 'tournament_names is required' },
            ]}
            label="Tournament Name"
            name={'tournament_names'}
            className="mb-[10px]">
            <Input placeholder="Tournament Name" />
          </Form.Item>
          <Form.Item
            className="mb-[10px]"
            rules={[{ required: true, message: 'game name is required' }]}
            label="Game"
            name={'game_id'}>
            <Select style={{ width: '100%' }} options={selectData?.game} />
          </Form.Item>
          <Form.Item
            className="mb-[10px]"
            rules={[{ required: true, message: 'game name is required' }]}
            label="Team A"
            name={'team_a_id'}>
            <Select style={{ width: '100%' }} options={selectData?.team} />
          </Form.Item>
          <Form.Item
            className="mb-[10px]"
            rules={[{ required: true, message: 'game name is required' }]}
            label="Team B"
            name={'team_b_id'}>
            <Select style={{ width: '100%' }} options={selectData?.team} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'team_a_odds is required' }]}
            label="Team A Odds"
            name={'team_a_odds'}
            className="mb-[10px]">
            <InputNumber placeholder="Odds A " className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'team_a_odds is required' }]}
            label="Team B Odds"
            name={'team_b_odds'}
            className="mb-[10px]">
            <InputNumber placeholder="Odds B" className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'team_a_odds is required' }]}
            label="Date"
            name={'date'}
            className="mb-[10px]">
            <DatePicker placeholder="date match" className="w-full" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: 'tournament_names is required' },
            ]}
            label="Link"
            name={'match_link'}
            className="mb-[10px]">
            <Input placeholder="Match Link" />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600]">Ongoing & Upcoming Match</h1>
        </div>
        <div>
          <Button
            size="large"
            className="bg-black text-white"
            onClick={() => setIsModalOpen(true)}>
            Create New
          </Button>
        </div>
      </div>
      <div>
        <Table loading={loading} dataSource={datas} columns={columns} />
      </div>
    </div>
  );
}
