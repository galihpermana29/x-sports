'use client';
import { Table, Button } from 'antd';
export default function Games() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <div className="p-[50px]">
      <div className="flex justify-between mb-[50px]">
        <div>
          <h1 className="text-[32px] font-[600]">Games</h1>
        </div>
        <div>
          <Button size="large" className="bg-black text-white">
            Create New
          </Button>
        </div>
      </div>
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}
