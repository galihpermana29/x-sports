'use client';
import CmsAPI from '@/api/cms';
import ImageUpload from '@/components/cms/Upload';
import { GamesObjectP, TeamObjectP } from '@/utils/interface';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Games() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<GamesObjectP[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<{
    nameType: 'edit' | 'create' | null;
    id?: number;
  }>(null);

  const handleOk = () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      try {
        if (type.nameType === 'edit') {
          await CmsAPI.updateGames(value, type.id);
        } else {
          await CmsAPI.createGames(value);
        }
        getAllGames();
        setIsModalOpen(false);
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
            setType({ nameType: 'edit', id: data.id });
            form.setFieldsValue(data);
          }}>
          Edit
        </Button>
      ),
    },
  ];

  const getAllGames = async () => {
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
    getAllGames();
  }, []);
  return (
    <div className="p-[50px]">
      <Modal
        title="Add New Games"
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
            <ImageUpload form={form} name="game_icons" />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600] text-black">Games</h1>
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
