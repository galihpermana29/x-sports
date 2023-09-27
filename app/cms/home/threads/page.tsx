'use client';
import CmsAPI from '@/api/cms';
import ImageUpload from '@/components/cms/Upload';
import { NewsObjectI, ThreadObjectI } from '@/utils/interface';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  DatePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function Threads() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<{
    nameType: 'edit' | 'create' | null;
    id?: number;
  }>(null);
  const [datas, setDatas] = useState<ThreadObjectI[]>();
  const [datasGames, setDatasGames] =
    useState<{ label: string; value: number }[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = () => {
    form.validateFields().then(async () => {
      const value = form.getFieldsValue();
      try {
        const { date } = value;
        const payload = { ...value, date: dayjs(date).format('DD MMMM YYYY') };
        if (type.nameType === 'edit') {
          await CmsAPI.updateThread(payload, type.id);
        } else {
          await CmsAPI.createThread(payload);
        }
        getAllThreads();
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Game',
      dataIndex: 'game_names',
      key: 'game_names',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <div className="max-w-[300px]">{description}</div>
      ),
    },
    {
      title: 'Images',
      dataIndex: 'image_thread',
      key: 'image_thread',
      render: (icon: string) => (
        <Image loader={() => icon} src={icon} alt="d" width={30} height={30} />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (data: NewsObjectI) => (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setType({ nameType: 'edit', id: data.id });
            const initial = { ...data, date: dayjs(data.date) };
            console.log(initial, 'initial');
            form.setFieldsValue(initial);
          }}>
          Edit
        </Button>
      ),
    },
  ];

  const getAllThreads = async () => {
    try {
      setLoading(true);
      const { data: dataGames } = await CmsAPI.getGames();
      const { data } = await CmsAPI.getThreads();
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
    getAllThreads();
  }, []);
  return (
    <div className="p-[50px]">
      <Modal
        title="Add New Thread"
        okText={'Add'}
        okButtonProps={{
          className: 'bg-black text-white',
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" className="my-[20px]" form={form}>
          <Form.Item
            rules={[{ required: true, message: 'title is required' }]}
            label="Title"
            name={'title'}
            className="mb-[10px]">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'game name is required' }]}
            label="Game"
            name={'game_id'}>
            <Select style={{ width: '100%' }} options={datasGames} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'description is required' }]}
            label="Description"
            name={'description'}
            className="mb-[10px]">
            <TextArea placeholder="description" />
          </Form.Item>
          <Form.Item
            name="image_thread"
            label="Thumbnail "
            rules={[{ required: true, message: 'image_thread is required' }]}>
            <ImageUpload form={form} name={'image_thread'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'team_a_odds is required' }]}
            label="Date"
            name={'date'}
            className="mb-[10px]">
            <DatePicker placeholder="Date" className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600] text-black">Threads</h1>
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
