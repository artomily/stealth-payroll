"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { usePayroll } from '@/contexts/PayrollContext';
import { decryptPayroll, PayrollData } from '@/lib/encryption';
import { formatWalletAddress, getSolscanUrl } from '@/lib/solana-mock';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Copy,
  CheckCircle2,
  DollarSign,
  Calendar,
  FileText,
  Key,
} from 'lucide-react';
import { toast } from 'sonner';

const EmployeeDashboard = () => {
  const { connected, address, secretKey, publicKeyBase64 } = useWallet();
  const { entries } = usePayroll();
  const [decryptedPayrolls, setDecryptedPayrolls] = useState<Record<string, PayrollData>>({});
  
  const employeeEntries = entries.filter(e => e.employeeWallet === address);

  const copyPublicKey = () => {
    if (publicKeyBase64) {
      navigator.clipboard.writeText(publicKeyBase64);
      toast.success('Public key copied!', {
        description: 'Share this with your employer for encrypted payroll.',
      });
    }
  };

  const decryptPayrollEntry = (entryId: string) => {
    const entry = employeeEntries.find(e => e.id === entryId);
    if (!entry || !secretKey) return;

    try {
      const decrypted = decryptPayroll(entry.encryptedPayload, secretKey);
      setDecryptedPayrolls(prev => ({
        ...prev,
        [entryId]: decrypted
      }));
    } catch (error) {
      toast.error('Failed to decrypt payroll', {
        description: 'Make sure you have the correct wallet connected.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
              <p className="text-muted-foreground">View and decrypt your salary slips</p>
            </div>
            <WalletButton role="employee" />
          </div>

          {!connected ? (
            <Card className="border-dashed">
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Connect Your Wallet</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Connect your wallet to view and decrypt your encrypted salary slips.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Public Key Card */}
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Your Public Key</p>
                        <p className="text-xs text-muted-foreground">Share with employer for encrypted payroll</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-3 py-2 rounded font-mono text-foreground">
                        {publicKeyBase64?.slice(0, 20)}...
                      </code>
                      <Button variant="ghost" size="icon" onClick={copyPublicKey}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Slips */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Your Salary Slips</h2>
                
                {employeeEntries.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12">
                      <div className="text-center space-y-3">
                        <DollarSign className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">No salary slips yet</p>
                        <p className="text-sm text-muted-foreground">Your employer will send encrypted payroll here</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {employeeEntries.map((entry) => {
                      const isDecrypted = !!decryptedPayrolls[entry.id];
                      const payrollData = decryptedPayrolls[entry.id];

                      return (
                        <Card key={entry.id}>
                          <CardContent className="py-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">
                                    From: {formatWalletAddress(entry.employeeWallet)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {entry.transaction && (
                                    <a
                                      href={getSolscanUrl(entry.transaction.signature)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 hover:bg-muted rounded"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                  {entry.status === 'confirmed' && (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                              </div>

                              {isDecrypted && payrollData ? (
                                <div className="bg-muted p-4 rounded-lg space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-medium">{payrollData.amount} {payrollData.currency}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Period:</span>
                                    <span className="font-medium">{payrollData.period}</span>
                                  </div>
                                  {payrollData.notes && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Notes:</span>
                                      <span className="font-medium">{payrollData.notes}</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => decryptPayrollEntry(entry.id)}
                                  disabled={!secretKey}
                                >
                                  <Unlock className="w-4 h-4 mr-2" />
                                  Decrypt Salary Details
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
