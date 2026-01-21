import { useState } from 'react';
import { Header } from '@/components/Header';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { usePayroll, PayrollEntry } from '@/contexts/PayrollContext';
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
  
  const employeeEntries = entries.filter(e => e.employeeWallet === address);

  const copyPublicKey = () => {
    if (publicKeyBase64) {
      navigator.clipboard.writeText(publicKeyBase64);
      toast.success('Public key copied!', {
        description: 'Share this with your employer for encrypted payroll.',
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
                    <CardContent className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                        <EyeOff className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">No salary slips yet</p>
                        <p className="text-sm text-muted-foreground">
                          Encrypted payroll entries will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {employeeEntries.map((entry) => (
                      <SalarySlipCard key={entry.id} entry={entry} secretKey={secretKey!} />
                    ))}
                  </div>
                )}
              </div>

              {/* Demo Instructions */}
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="py-6">
                  <h3 className="font-semibold text-foreground mb-2">Demo Mode</h3>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Copy your public key above</li>
                    <li>Open the Employer dashboard in another tab</li>
                    <li>Paste your public key when creating payroll</li>
                    <li>Return here to decrypt and view your salary</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function SalarySlipCard({ entry, secretKey }: { entry: PayrollEntry; secretKey: Uint8Array }) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptedData, setDecryptedData] = useState<PayrollData | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = async () => {
    setIsDecrypting(true);
    try {
      // Simulate decryption delay for effect
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = decryptPayroll(entry.encryptedPayload, secretKey);
      setDecryptedData(data);
      setIsDecrypted(true);
      toast.success('Salary slip decrypted!');
    } catch (error) {
      toast.error('Decryption failed', {
        description: 'This payroll may not be intended for you.',
      });
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <Card className={isDecrypted ? 'border-secondary/50' : 'border-primary/30'}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {isDecrypted ? (
              <>
                <Unlock className="w-5 h-5 text-secondary" />
                Salary Slip
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-primary" />
                Encrypted Salary Slip
              </>
            )}
          </CardTitle>
          {entry.transaction && (
            <a
              href={getSolscanUrl(entry.transaction.signature)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View on Solscan
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <CardDescription>
          Received {new Date(entry.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isDecrypted ? (
          <div className="space-y-4">
            {/* Encrypted preview */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Encrypted Data</p>
              <code className="text-xs font-mono text-foreground break-all">
                {entry.encryptedPayload.ciphertext.slice(0, 60)}...
              </code>
            </div>
            
            <Button
              variant="hero"
              className="w-full gap-2"
              onClick={handleDecrypt}
              disabled={isDecrypting}
            >
              {isDecrypting ? (
                <>
                  <Lock className="w-4 h-4 animate-pulse" />
                  Decrypting...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Decrypt with Wallet Key
                </>
              )}
            </Button>
          </div>
        ) : decryptedData ? (
          <div className="space-y-4 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Amount</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {decryptedData.amount.toLocaleString()} {decryptedData.currency}
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Period</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {decryptedData.period}
                </p>
              </div>
            </div>
            
            {decryptedData.notes && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Notes</span>
                </div>
                <p className="text-foreground">{decryptedData.notes}</p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Verified on-chain • Transaction: {formatWalletAddress(entry.transaction?.signature || '')}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default EmployeeDashboard;
