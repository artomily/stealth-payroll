import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { EncryptedPayload, PayrollData, encryptPayroll, base64ToPublicKey } from '@/lib/encryption';
import { MockTransaction, sendPayrollTransaction } from '@/lib/solana-mock';

export interface PayrollEntry {
  id: string;
  encryptedPayload: EncryptedPayload;
  transaction: MockTransaction | null;
  createdAt: number;
  employeeWallet: string;
  employeePublicKey: string;
  status: 'pending' | 'sending' | 'confirmed' | 'failed';
}

interface PayrollContextType {
  entries: PayrollEntry[];
  createPayrollEntry: (
    employerAddress: string,
    employeeWallet: string,
    employeePublicKey: string,
    data: Omit<PayrollData, 'employeeWallet' | 'timestamp'>
  ) => Promise<PayrollEntry>;
  getEntriesForEmployee: (wallet: string) => PayrollEntry[];
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export function PayrollProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<PayrollEntry[]>([]);

  const createPayrollEntry = useCallback(async (
    employerAddress: string,
    employeeWallet: string,
    employeePublicKey: string,
    data: Omit<PayrollData, 'employeeWallet' | 'timestamp'>
  ): Promise<PayrollEntry> => {
    const payrollData: PayrollData = {
      ...data,
      employeeWallet,
      timestamp: Date.now(),
    };

    // Encrypt the payroll data
    const publicKey = base64ToPublicKey(employeePublicKey);
    const encryptedPayload = encryptPayroll(payrollData, publicKey);

    const entry: PayrollEntry = {
      id: crypto.randomUUID(),
      encryptedPayload,
      transaction: null,
      createdAt: Date.now(),
      employeeWallet,
      employeePublicKey,
      status: 'sending',
    };

    setEntries(prev => [...prev, entry]);

    try {
      // Send the mock transaction
      const transaction = await sendPayrollTransaction(
        employerAddress,
        employeeWallet,
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

  const getEntriesForEmployee = useCallback((wallet: string): PayrollEntry[] => {
    return entries.filter(e => e.employeeWallet === wallet);
  }, [entries]);

  return (
    <PayrollContext.Provider value={{ entries, createPayrollEntry, getEntriesForEmployee }}>
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
