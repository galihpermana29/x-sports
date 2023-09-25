'use client';

import { useAuth } from '@/context/Web3AuthContext';
import { useEffect } from 'react';

export default function Navbar() {
  const {
    walletAddress,
    isConnected,
    connectWallet,
    addBitTorrentChainToMetaMask,
  } = useAuth();

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="bg-[#2A313B] min-h-[68px] w-full flex justify-end items-center p-[20px]">
      {walletAddress ? (
        <div>
          {isConnected ? (
            <div
              onClick={connectWallet}
              className="bg-[#F44D0E] text-white rounded-[50px] px-[20px] py-[10px] cursor-pointer">
              Connected to BitTorrent
            </div>
          ) : (
            <div
              className="bg-[#F44D0E] text-white rounded-[50px] px-[20px] py-[10px] cursor-pointer"
              onClick={addBitTorrentChainToMetaMask}>
              Add BitTorrent Chain to MetaMask
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-[#F44D0E] text-white rounded-[50px] px-[20px] py-[10px] cursor-pointer"
          onClick={connectWallet}>
          Connect Walletes
        </button>
      )}
    </div>
  );
}
