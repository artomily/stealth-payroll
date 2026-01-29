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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Dashboard</h1>
              <p className="text-muted-foreground">Your encrypted salary slips</p>
            </div>
            <WalletButton role="employee" />
          </div>

          {!connected ? (
            <Card className="border-dashed border-border/50">
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
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="py-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Your Public Key</p>
                        <p className="text-xs text-muted-foreground">Share this with your employer for encrypted payroll</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background/50 px-3 py-2 rounded border border-border/50 font-mono text-foreground">
                        {publicKeyBase64?.slice(0, 24)}...
                      </code>
                      <Button variant="outline" size="sm" onClick={copyPublicKey} className="border-primary/20 hover:bg-primary/10">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Slips */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Salary Slips</h2>
                  <p className="text-sm text-muted-foreground">All payroll sent to your wallet</p>
                </div>
                
                {employeeEntries.length === 0 ? (
                  <Card className="border-dashed border-border/50">
                    <CardContent className="py-12">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">No salary slips yet</p>
                          <p className="text-sm text-muted-foreground mt-1">Your encrypted payroll will appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {employeeEntries.map((entry) => {
                      const isDecrypted = !!decryptedPayrolls[entry.id];
                      const payrollData = decryptedPayrolls[entry.id];

                      return (
                        <Card key={entry.id} className="border-border/50 hover:border-primary/20 transition-colors">
                          <CardContent className="py-5">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    {isDecrypted ? (
                                      <Unlock className="w-4 h-4 text-primary" />
                                    ) : (
                                      <Lock className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className="text-sm font-medium">
                                      {isDecrypted ? 'Decrypted' : 'Encrypted'} Payroll
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>From: {formatWalletAddress(entry.employeeWallet)}</span>
                                    <span>•</span>
                                    <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {entry.status === 'confirmed' && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Confirmed
                                    </div>
                                  )}
                                  {entry.transaction && (
                                    <a
                                      href={getSolscanUrl(entry.transaction.signature)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 hover:bg-muted rounded transition-colors"
                                      title="View on Solscan"
                                    >
                                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    </a>
                                  )}
                                </div>
                              </div>

                              {isDecrypted && payrollData ? (
                                <div className="bg-muted/50 border border-border/50 p-4 rounded-lg space-y-2.5">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Amount</span>
                                    <span className="text-2xl font-bold tabular-nums">
                                      {payrollData.amount.toLocaleString()} {payrollData.currency}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <span className="text-sm text-muted-foreground">Period</span>
                                    <span className="font-medium">{payrollData.period}</span>
                                  </div>
                                  {payrollData.notes && (
                                    <div className="flex justify-between items-start pt-2 border-t border-border/50">
                                      <span className="text-sm text-muted-foreground">Notes</span>
                                      <span className="font-medium text-right max-w-xs">{payrollData.notes}</span>
                                    </div>
                                  )}
                                  <div className="pt-2 border-t border-border/50">
                                    <p className="text-xs text-primary flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Successfully decrypted with your private key
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="bg-muted/30 p-4 rounded-lg border border-dashed border-border/50">
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Lock className="w-4 h-4" />
                                      This payroll is encrypted. Only you can decrypt it with your wallet.
                                    </p>
                                  </div>
                                  <Button
                                    variant="default"
                                    className="w-full bg-primary hover:bg-primary/90"
                                    onClick={() => decryptPayrollEntry(entry.id)}
                                    disabled={!secretKey}
                                  >
                                    <Unlock className="w-4 h-4 mr-2" />
                                    Decrypt with Wallet
                                  </Button>
                                </div>
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
