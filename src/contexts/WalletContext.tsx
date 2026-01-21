import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { generateKeyPair, publicKeyToBase64 } from '@/lib/encryption';
import { generateMockWallet } from '@/lib/solana-mock';

export type WalletMode = 'mock' | 'devnet';
export type UserRole = 'employer' | 'employee' | null;

interface WalletState {
  connected: boolean;
  address: string | null;
  publicKey: Uint8Array | null;
  secretKey: Uint8Array | null;
  publicKeyBase64: string | null;
  role: UserRole;
  mode: WalletMode;
}

interface WalletContextType extends WalletState {
  connect: (role: UserRole) => Promise<void>;
  disconnect: () => void;
  setMode: (mode: WalletMode) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    publicKey: null,
    secretKey: null,
    publicKeyBase64: null,
    role: null,
    mode: 'mock',
  });

  const connect = useCallback(async (role: UserRole) => {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock keypair
    const keyPair = generateKeyPair();
    const address = generateMockWallet();
    
    setState({
      connected: true,
      address,
      publicKey: keyPair.publicKey,
      secretKey: keyPair.secretKey,
      publicKeyBase64: publicKeyToBase64(keyPair.publicKey),
      role,
      mode: state.mode,
    });
  }, [state.mode]);

  const disconnect = useCallback(() => {
    setState({
      connected: false,
      address: null,
      publicKey: null,
      secretKey: null,
      publicKeyBase64: null,
      role: null,
      mode: state.mode,
    });
  }, [state.mode]);

  const setMode = useCallback((mode: WalletMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect, setMode }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
