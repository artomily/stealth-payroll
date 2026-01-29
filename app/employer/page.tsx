"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { usePayroll } from '@/contexts/PayrollContext';
import { formatWalletAddress, getSolscanUrl } from '@/lib/solana-mock';
import { 
  Send, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  ExternalLink, 
  Clock,
  DollarSign,
  User,
  FileText,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

const EmployerDashboard = () => {
  const { connected, address, publicKeyBase64 } = useWallet();
  const { entries, createPayrollEntry } = usePayroll();
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Form state
  const [employeeWallet, setEmployeeWallet] = useState('');
  const [employeePublicKey, setEmployeePublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDC');
  const [period, setPeriod] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreatePayroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !employeeWallet || !employeePublicKey || !amount || !period) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    try {
      await createPayrollEntry(
        address,
        employeeWallet,
        employeePublicKey,
        {
          amount: parseFloat(amount),
          currency,
          period,
          notes: notes || undefined,
        }
      );
      
      toast.success('Payroll sent successfully!', {
        description: 'The salary has been encrypted and sent on-chain.',
      });
      
      // Reset form
      setEmployeeWallet('');
      setEmployeePublicKey('');
      setAmount('');
      setPeriod('');
      setNotes('');
      setIsCreating(false);
    } catch (error) {
      toast.error('Failed to send payroll', {
        description: 'Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const employerEntries = entries.filter(e => e.transaction?.from === address);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employer Dashboard</h1>
              <p className="text-muted-foreground">Create and send encrypted payroll</p>
            </div>
            <WalletButton role="employer" />
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
                    Connect your wallet to manage payroll.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* CREATE PAYROLL FORM */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Payroll
                  </CardTitle>
                  <CardDescription>
                    Send encrypted salary to an employee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePayroll} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="wallet">Employee Wallet Address</Label>
                        <Input
                          id="wallet"
                          placeholder="Solana address..."
                          value={employeeWallet}
                          onChange={(e) => setEmployeeWallet(e.target.value)}
                          disabled={isSending}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pubkey">Employee Public Key</Label>
                        <Input
                          id="pubkey"
                          placeholder="Base64 encoded public key..."
                          value={employeePublicKey}
                          onChange={(e) => setEmployeePublicKey(e.target.value)}
                          disabled={isSending}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          disabled={isSending}
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <select 
                          id="currency"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          disabled={isSending}
                        >
                          <option>USDC</option>
                          <option>SOL</option>
                          <option>USDT</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="period">Period</Label>
                        <Input
                          id="period"
                          placeholder="e.g., January 2024"
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                          disabled={isSending}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        placeholder="Add any notes..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isSending}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Payroll
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* PAYROLL HISTORY */}
              <Card>
                <CardHeader>
                  <CardTitle>Payroll History</CardTitle>
                  <CardDescription>
                    All payroll transactions you've created
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {employerEntries.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No payroll created yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {employerEntries.map((entry) => (
                        <div key={entry.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">{formatWalletAddress(entry.employeeWallet)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                entry.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                  : entry.status === 'failed'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              }`}>
                                {entry.status}
                              </div>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
