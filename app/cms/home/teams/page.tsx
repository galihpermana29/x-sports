'use client';
import CmsAPI from '@/api/cms';
import { TeamObjectP } from '@/utils/interface';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Teams() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<TeamObjectP[]>();
  const [datasGames, setDatasGames] =
    useState<{ label: string; value: number }[]>();

  const handleOk = () => {
    form.validateFields().then(() => {
      const value = form.getFieldsValue();
      console.log(value);
      setIsModalOpen(false);
    });
  };

  const columns = [
    {
      title: 'Team Name',
      dataIndex: 'team_names',
      key: 'team_names',
    },
    {
      title: 'Game',
      dataIndex: 'game_names',
      key: 'game_names',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: string) => (
        <Image loader={() => icon} src={icon} alt="d" width={30} height={30} />
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (data: TeamObjectP) => (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            form.setFieldsValue(data);
          }}>
          Edit
        </Button>
      ),
    },
  ];

  const getAllTeams = async () => {
    try {
      const { data } = await CmsAPI.getTeams();
      const { data: dataGames } = await CmsAPI.getGames();
      const newMap = data.map((d) => ({
        ...d,
        key: d.id,
        icon: 'https://res.cloudinary.com/dpcwbnax4/image/upload/v1694712259/MERCH%20%2B%20BG/Artboard_1_wtscgn.png',
      }));
      const gamesNewMap = dataGames.map((d) => ({
        label: d.game_names,
        value: d.id,
      }));
      setDatasGames(gamesNewMap);
      setDatas(newMap);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);
  return (
    <div className="p-[50px]">
      <Modal
        title="Add New Team"
        okText={'Add'}
        okButtonProps={{
          className: 'bg-black text-white',
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" className="my-[20px]" form={form}>
          <Form.Item
            rules={[{ required: true, message: 'team name is required' }]}
            label="Team Name"
            name={'team_names'}
            className="mb-[10px]">
            <Input placeholder="Team Name" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'game name is required' }]}
            label="Game"
            name={'game_id'}>
            <Select style={{ width: '100%' }} options={datasGames} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600]">Teams</h1>
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
        <Table dataSource={datas} columns={columns} />
      </div>
    </div>
  );
}
