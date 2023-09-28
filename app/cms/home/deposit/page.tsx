'use client';
import { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import contractAbi from '@/utils/web3/ABI.json';
import { ethers } from 'ethers';
import { contractAddress } from '@/utils/web3/address';
import { useAuth } from '@/context/Web3AuthContext';

export default function Deposit() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { ethersProvider } = useAuth();
  const [depositAmount, setDepositAmount] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toWei = (num: number) => ethers.utils.parseEther(num.toString());

  const handleDeposit = async () => {
    try {
      const signer = await ethersProvider.getSigner();
      const contracts = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const transaction = await contracts.deposit({ value: toWei(depositAmount) });

      await transaction.wait();
      message.success(`Transaction successful: Deposited ${depositAmount} BTTC`);
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error('Transaction failed');
    }
  };

  return (
    <div className="p-[50px]">
      <Button
        size="large"
        className="bg-black text-white"
        onClick={showModal}>
        Deposit
      </Button>
      <Modal
        title="Deposit"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" className="my-[20px]">
          <Form.Item
            rules={[{ required: true, message: 'Amount is required' }]}
            label="Deposit Amount"
            name="amount"
            className="mb-[10px]"
          >
            <Input
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
            />
          </Form.Item>
          <Button
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
