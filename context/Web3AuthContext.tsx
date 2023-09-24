'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Web3 from 'web3';

let web3: Web3 | undefined;
let ethereum: any;

if (typeof window !== 'undefined') {
  ethereum = (window as any).ethereum;
  web3 = new Web3(ethereum);
}

interface AuthContextType {
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  addBitTorrentChainToMetaMask: () => Promise<void>;
}

type MyComponentProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (web3 && ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress(null);
          localStorage.removeItem('walletAddress');
          setIsConnected(false);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (web3 && ethereum) {
        const data = await ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = (await web3.eth.net.getId()).toString();
        setWalletAddress(data[0]);
        setIsConnected(true);
        if (networkId !== '1029') {
          addBitTorrentChainToMetaMask();
          setIsConnected(true);
          return;
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const addBitTorrentChainToMetaMask = async () => {
    try {
      if (ethereum) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x405',
              chainName: 'BitTorrent Chain Donau',
              nativeCurrency: {
                name: 'BTT',
                symbol: 'BTT',
                decimals: 18,
              },
              rpcUrls: ['https://pre-rpc.bt.io/'],
              // blockExplorerUrls: ['https://explorer.btt.chain.com'],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error adding BitTorrent Chain to MetaMask:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        walletAddress,
        isConnected,
        connectWallet,
        addBitTorrentChainToMetaMask,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
