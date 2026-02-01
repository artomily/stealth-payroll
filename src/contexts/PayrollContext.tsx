import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { EncryptedPayload, PayrollData, encryptPayroll, base64ToPublicKey } from '@/lib/encryption';
import { MockTransaction, sendPayrollTransaction } from '@/lib/solana-mock';

export interface PayrollEntry {
  employeeWallet: string | null;
  id: string;
  encryptedPayload: EncryptedPayload;
  transaction: MockTransaction | null;
  createdAt: number;
  recipientWallet: string;
  recipientPublicKey: string;
  status: 'pending' | 'sending' | 'confirmed' | 'failed';
}

interface PayrollContextType {
  entries: PayrollEntry[];
  createPayrollEntry: (
    senderAddress: string,
    recipientWallet: string,
    recipientPublicKey: string,
    data: Omit<PayrollData, 'recipientWallet' | 'timestamp'>
  ) => Promise<PayrollEntry>;
  getEntriesForRecipient: (wallet: string) => PayrollEntry[];
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export function PayrollProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<PayrollEntry[]>([]);

  const createPayrollEntry = useCallback(async (
    senderAddress: string,
    recipientWallet: string,
    recipientPublicKey: string,
    data: Omit<PayrollData, 'recipientWallet' | 'timestamp'>
  ): Promise<PayrollEntry> => {
    const payrollData: PayrollData = {
      ...data,
      recipientWallet,
      timestamp: Date.now(),
    };

    // Encrypt the payroll data
    const publicKey = base64ToPublicKey(recipientPublicKey);
    const encryptedPayload = encryptPayroll(payrollData, publicKey);

    const entry: PayrollEntry = {
      id: crypto.randomUUID(),
      encryptedPayload,
      transaction: null,
      createdAt: Date.now(),
      recipientWallet,
      recipientPublicKey,
      employeeWallet: null,
      status: 'sending',
    };

    setEntries(prev => [...prev, entry]);

    try {
      // Send the mock transaction
      const transaction = await sendPayrollTransaction(
        senderAddress,
        recipientWallet,
        JSON.stringify(encryptedPayload)
      );

      const updatedEntry: PayrollEntry = {
        ...entry,
        transaction,
        status: 'confirmed',
      };

      setEntries(prev => prev.map(e => e.id === entry.id ? updatedEntry : e));
      return updatedEntry;
    } catch (error) {
      const failedEntry: PayrollEntry = {
        ...entry,
        status: 'failed',
      };
      setEntries(prev => prev.map(e => e.id === entry.id ? failedEntry : e));
      throw error;
    }
  }, []);

  const getEntriesForRecipient = useCallback((wallet: string): PayrollEntry[] => {
    return entries.filter(e => e.recipientWallet === wallet);
  }, [entries]);

  return (
    <PayrollContext.Provider value={{ entries, createPayrollEntry, getEntriesForRecipient }}>
      {children}
    </PayrollContext.Provider>
  );
}

export function usePayroll() {
  const context = useContext(PayrollContext);
  if (context === undefined) {
    throw new Error('usePayroll must be used within a PayrollProvider');
  }
  return context;
}
