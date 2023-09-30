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
  Row,
  TimePicker,
  FormInstance,
} from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useAuth } from '@/context/Web3AuthContext';

import contractAbi from '@/utils/web3/ABI.json';
import { ethers } from 'ethers';
import { contractAddress } from '@/utils/web3/address';

export default function Ongoing() {
  const [form] = Form.useForm();
  const { ethersProvider } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<{
    open: boolean;
    type: 'create' | 'end';
  }>({ open: false, type: 'create' });

  const toWei = (num: number) => ethers.utils.parseEther(num.toString());
  const [datas, setDatas] = useState<MatchObjectI[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<{
    game: { label: string; value: number }[];
    team: { label: string; value: number }[];
  }>();
  const [teamWinnerOption, setTeamWinnerOption] = useState<{
    team: { label: string; value: number }[];
    matchId: number;
  }>();

  const handleOk = () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      try {
        const { date, time } = value;
        const formattedTime = dayjs(time).format('HH:mm:ss');
        const formattedDate = dayjs(date).format('YYYY-MM-DD');

        const payload = {
          ...value,
          date: formattedDate + ' ' + formattedTime + ' ' + '+07:00',
        };
        const { team_a_id, team_a_odds, team_b_id, team_b_odds } = payload;

        const { data: matchId } = await CmsAPI.createMatch(payload);

        try {
          const signer = await ethersProvider.getSigner();
          const contracts = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );

          const transaction = await contracts.createMatch(
            matchId,
            team_a_id.toString(),
            team_b_id.toString(),
            toWei(100000000000),
            team_a_odds,
            team_b_odds
          );

          await transaction.wait();
          message.success(`Transaction successful: ${transaction.hash}`);
        } catch (error) {
          console.log(error, 'err');
          handleDeleteMatch(matchId);
        }

        getAllMatch();
        setIsModalOpen({ open: false, type: 'create' });
        form.resetFields();
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

  const handleDeleteMatch = async (id: number) => {
    try {
      await CmsAPI.deleteMatch(id);
      message.success('Match deleted');
      getAllMatch();
    } catch (error) {
      const axiosError = error as AxiosError; // Cast error to AxiosError
      const responseData = axiosError.response?.data as
        | { errors: string[] }
        | undefined;
      const err = responseData
        ? responseData?.errors[0]
        : 'Ouch, an error happen!';
      console.log(error, responseData, 'error');
      message.error(err);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await CmsAPI.updateMatch({ status }, id);
      message.success('Match updated');
      getAllMatch();
    } catch (error) {
      const axiosError = error as AxiosError; // Cast error to AxiosError
      const responseData = axiosError.response?.data as
        | { errors: string[] }
        | undefined;
      const err = responseData
        ? responseData?.errors[0]
        : 'Ouch, an error happen!';
      console.log(error, responseData, 'error');
      message.error(err);
    }
  };

  const handleEnd = async () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      console.log(value, 'value');
      try {
        try {
          const signer = await ethersProvider.getSigner();
          const contracts = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          let valueOfTeam = 1;
          if (value === teamWinnerOption.team[0].value) valueOfTeam = 1;
          else valueOfTeam = 2;
          const transaction = await contracts.endMatch(
            teamWinnerOption.matchId,
            valueOfTeam
          );

          console.log(value, teamWinnerOption, valueOfTeam);
          updateStatus(teamWinnerOption.matchId, 'completed');

          await transaction.wait();
          message.success(`Transaction successful: ${transaction.hash}`);
        } catch (error) {
          console.log(error, 'err');
          updateStatus(teamWinnerOption.matchId, 'ongoing');
        }
      } catch (error) {
        const axiosError = error as AxiosError; // Cast error to AxiosError
        const responseData = axiosError.response?.data as
          | { errors: string[] }
          | undefined;
        const err = responseData
          ? responseData?.errors[0]
          : 'Ouch, an error happen!';
        console.log(error, responseData, 'error');
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      render: (team_a_odds: number) => (
        <div className="max-w-[150px]">{team_a_odds / 100}</div>
      ),
    },
    {
      title: 'Team B',
      dataIndex: 'team_b_names',
      key: 'team_b_names',
    },

    {
      title: 'B Odds',
      dataIndex: 'team_b_odds',
      key: 'team_b_odds',
      render: (team_b_odds: number) => (
        <div className="max-w-[150px]">{team_b_odds / 100}</div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div className="max-w-[150px]">
          {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      ),
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
      render: (data: MatchObjectI) => (
        <Row justify={'center'} style={{ display: 'flex', gap: '10px' }}>
          <Button
            onClick={() => {
              const selection = [
                { label: data.team_a_names, value: data.team_a_id },
                { label: data.team_b_names, value: data.team_b_id },
              ];
              setIsModalOpen({ open: true, type: 'end' });
              setTeamWinnerOption({ team: selection, matchId: data.id });
            }}
            type="primary"
            style={{ background: 'red' }}>
            End
          </Button>
          {data.status === 'upcoming' && (
            <Button
              onClick={() => updateStatus(data.id, 'ongoing')}
              style={{ background: 'blue' }}
              type="primary">
              Ongoing
            </Button>
          )}
          <Button
            style={{ background: 'grey', color: 'white' }}
            onClick={() => handleDeleteMatch(data.id)}>
            Delete
          </Button>
        </Row>
      ),
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
        open={isModalOpen.open}
        onOk={isModalOpen.type === 'create' ? handleOk : handleEnd}
        onCancel={() => setIsModalOpen({ open: false, type: 'create' })}>
        {isModalOpen.type === 'create' && (
          <CreateFormModal form={form} selectData={selectData} />
        )}
        {isModalOpen.type === 'end' && (
          <SelectWinner form={form} selectData={teamWinnerOption} />
        )}
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600] text-black">
            Ongoing & Upcoming Match
          </h1>
        </div>
        <div>
          <Button
            size="large"
            className="bg-black text-white"
            onClick={() => setIsModalOpen({ open: true, type: 'create' })}>
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

const SelectWinner = ({
  form,
  selectData,
}: {
  form: FormInstance<any>;
  selectData: {
    team: { label: string; value: number }[];
    matchId: number;
  };
}) => {
  return (
    <Form layout="vertical" className="my-[20px]" form={form}>
      <Form.Item
        className="mb-[10px]"
        rules={[{ required: true, message: 'team name is required' }]}
        label="Select Winner"
        name={'winner'}>
        <Select style={{ width: '100%' }} options={selectData?.team} />
      </Form.Item>
    </Form>
  );
};

const CreateFormModal = ({
  form,
  selectData,
}: {
  form: FormInstance<any>;
  selectData: {
    game: { label: string; value: number }[];
    team: { label: string; value: number }[];
  };
}) => {
  return (
    <Form layout="vertical" className="my-[20px]" form={form}>
      <Form.Item
        rules={[{ required: true, message: 'tournament_names is required' }]}
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
        <DatePicker placeholder="Date match" className="w-full" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'team_a_odds is required' }]}
        label="Time"
        name={'time'}
        className="mb-[10px]">
        <TimePicker
          placeholder="Time match"
          format="HH:mm:ss"
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'tournament_names is required' }]}
        label="Link"
        name={'match_link'}
        className="mb-[10px]">
        <Input placeholder="Match Link" />
      </Form.Item>
    </Form>
  );
};
