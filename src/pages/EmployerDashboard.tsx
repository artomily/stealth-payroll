import { useState } from 'react';
import { Header } from '@/components/Header';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { usePayroll, PayrollEntry } from '@/contexts/PayrollContext';
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
                    Connect your employer wallet to create and send encrypted payroll entries.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Create Payroll Button */}
              {!isCreating && (
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="w-5 h-5" />
                  Create New Payroll Entry
                </Button>
              )}

              {/* Create Payroll Form */}
              {isCreating && (
                <Card className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      New Payroll Entry
                    </CardTitle>
                    <CardDescription>
                      Enter employee details and salary information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreatePayroll} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="employeeWallet" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Employee Wallet Address
                          </Label>
                          <Input
                            id="employeeWallet"
                            placeholder="So1ana..."
                            value={employeeWallet}
                            onChange={(e) => setEmployeeWallet(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeePublicKey" className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Employee Public Key (Base64)
                          </Label>
                          <Input
                            id="employeePublicKey"
                            placeholder="Encryption public key"
                            value={employeePublicKey}
                            onChange={(e) => setEmployeePublicKey(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Input
                            id="currency"
                            placeholder="USDC"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="period">Period</Label>
                          <Input
                            id="period"
                            placeholder="January 2025"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Notes (optional)
                        </Label>
                        <Input
                          id="notes"
                          placeholder="Bonus, commission details, etc."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setIsCreating(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="hero"
                          disabled={isSending}
                          className="gap-2"
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Encrypting & Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Encrypt & Send
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Sent Payrolls */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Sent Payrolls</h2>
                
                {employerEntries.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No payroll entries yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {employerEntries.map((entry) => (
                      <PayrollEntryCard key={entry.id} entry={entry} />
                    ))}
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

function PayrollEntryCard({ entry }: { entry: PayrollEntry }) {
  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-muted-foreground" />,
    sending: <Loader2 className="w-4 h-4 text-primary animate-spin" />,
    confirmed: <CheckCircle2 className="w-4 h-4 text-secondary" />,
    failed: <Clock className="w-4 h-4 text-destructive" />,
  };

  return (
    <Card className="hover:border-primary/30 transition-colors">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {statusIcons[entry.status]}
            <div>
              <p className="font-mono text-sm text-foreground">
                To: {formatWalletAddress(entry.employeeWallet)}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
              Encrypted
            </span>
            {entry.transaction && (
              <a
                href={getSolscanUrl(entry.transaction.signature)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmployerDashboard;
