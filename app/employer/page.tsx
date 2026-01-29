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
  Shield,
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
            <Card className="border-dashed border-border/50">
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Connect Your Wallet</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Connect your wallet to create and manage encrypted payroll.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* CREATE PAYROLL BUTTON */}
              {!isCreating && (
                <Button 
                  onClick={() => setIsCreating(true)}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Payroll
                </Button>
              )}

              {/* CREATE PAYROLL FORM */}
              {isCreating && (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lock className="w-5 h-5 text-primary" />
                      Create Encrypted Payroll
                    </CardTitle>
                    <CardDescription>
                      Salary data will be encrypted with the employee's public key
                    </CardDescription>
                  </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePayroll} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="wallet" className="text-sm font-medium">Employee Wallet Address</Label>
                        <Input
                          id="wallet"
                          placeholder="e.g., 7x9k...4f3a"
                          value={employeeWallet}
                          onChange={(e) => setEmployeeWallet(e.target.value)}
                          disabled={isSending}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pubkey" className="text-sm font-medium">
                          Employee Public Key
                          <span className="text-xs text-muted-foreground ml-2">(for encryption)</span>
                        </Label>
                        <Input
                          id="pubkey"
                          placeholder="MIIBIjANBgkqhkiG9w0BAQE..."
                          value={employeePublicKey}
                          onChange={(e) => setEmployeePublicKey(e.target.value)}
                          disabled={isSending}
                          className="bg-background font-mono text-xs"
                        />
                        <p className="text-xs text-primary flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Used to encrypt salary details
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="5000"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          disabled={isSending}
                          step="0.01"
                          className="bg-background text-lg font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency" className="text-sm font-medium">Currency</Label>
                        <select 
                          id="currency"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
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
                        <Label htmlFor="period" className="text-sm font-medium">Pay Period</Label>
                        <Input
                          id="period"
                          placeholder="January 2026"
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                          disabled={isSending}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        placeholder="Additional payment details..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isSending}
                      />
                    </div>

                    <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
                      <p className="text-sm text-foreground flex items-start gap-2">
                        <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          The amount and details will be encrypted using the employee's public key. 
                          Only they can decrypt it with their wallet.
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreating(false)}
                        disabled={isSending}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-primary hover:bg-primary/90"
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
                            Send Encrypted Payroll
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              )}

              {/* PAYROLL HISTORY */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Payroll Transfers</CardTitle>
                  <CardDescription>
                    All encrypted payroll transactions you've sent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {employerEntries.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No payroll sent yet</p>
                      <p className="text-sm text-muted-foreground mt-1">Create your first encrypted payroll above</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {employerEntries.map((entry) => (
                        <div key={entry.id} className="p-4 border border-border/50 rounded-lg hover:border-primary/20 transition-colors bg-card/50">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <p className="font-medium text-sm">{formatWalletAddress(entry.employeeWallet)}</p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(entry.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1 text-primary">
                                  <Lock className="w-3 h-3" />
                                  End-to-end encrypted
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {entry.status === 'confirmed' && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Sent
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
