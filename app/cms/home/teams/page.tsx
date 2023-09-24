'use client';
import CmsAPI from '@/api/cms';
import ImageUpload from '@/components/cms/Upload';
import { TeamObjectP } from '@/utils/interface';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Teams() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<{
    nameType: 'edit' | 'create' | null;
    id?: number;
  }>(null);
  const [datas, setDatas] = useState<TeamObjectP[]>();
  const [datasGames, setDatasGames] =
    useState<{ label: string; value: number }[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      try {
        if (type.nameType === 'edit') {
          await CmsAPI.updateTeams(value, type.id);
        } else {
          await CmsAPI.createTeams(value);
        }
        getAllTeams();
        form.resetFields();
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
      dataIndex: 'team_icons',
      key: 'team_icons',
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
            setType({ nameType: 'edit', id: data.id });
            form.setFieldsValue(data);
          }}>
          Edit
        </Button>
      ),
    },
  ];

  const getAllTeams = async () => {
    try {
      setLoading(true);
      const { data: dataGames } = await CmsAPI.getGames();
      const { data } = await CmsAPI.getTeams();
      const newMap = data.map((d) => ({
        ...d,
        key: d.id,
      }));
      const gamesNewMap = dataGames.map((d) => ({
        label: d.game_names,
        value: d.id,
      }));
      setDatasGames(gamesNewMap);
      setDatas(newMap);
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
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
          <Form.Item
            name="team_icons"
            label="Game Icons"
            rules={[{ required: true, message: 'game icon is required' }]}>
            <ImageUpload form={form} name={'team_icons'} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600] text-black">Teams</h1>
        </div>
        <div>
          <Button
            size="large"
            className="bg-black text-white"
            onClick={() => {
              setType({ nameType: 'create' });
              setIsModalOpen(true);
            }}>
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
