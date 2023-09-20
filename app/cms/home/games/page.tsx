'use client';
import CmsAPI from '@/api/cms';
import ImageUpload from '@/components/cms/Upload';
import { GamesObjectP, TeamObjectP } from '@/utils/interface';
import { Table, Button, Modal, Form, Input } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Games() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<GamesObjectP[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    form.validateFields().then(() => {
      const value = form.getFieldsValue();
      console.log(value);
      setIsModalOpen(false);
    });
  };

  const columns = [
    {
      title: 'Game',
      dataIndex: 'game_names',
      key: 'game_names',
    },
    {
      title: 'Icon',
      dataIndex: 'game_icons',
      key: 'game_icons',
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
      setLoading(true);
      const { data } = await CmsAPI.getGames();
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
            label="Game Name"
            name={'game_names'}
            className="mb-[10px]">
            <Input placeholder="Game Name" />
          </Form.Item>

          <Form.Item
            name="game_icons"
            label="Game Icons"
            rules={[{ required: true, message: 'game icon is required' }]}>
            <ImageUpload />
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
        <Table loading={loading} dataSource={datas} columns={columns} />
      </div>
    </div>
  );
}
