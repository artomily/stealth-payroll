import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet, UserRole } from '@/contexts/WalletContext';
import { formatWalletAddress } from '@/lib/solana-mock';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

interface WalletButtonProps {
  role: UserRole;
}

export function WalletButton({ role }: WalletButtonProps) {
  const { connected, address, connect, disconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect(role);
    } finally {
      setIsConnecting(false);
    }
  };

  if (connected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg border border-border">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm font-mono text-foreground">
            {formatWalletAddress(address)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={disconnect}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="hero"
      onClick={handleConnect}
      disabled={isConnecting}
      className="gap-2"
    >
      {isConnecting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="h-4 w-4" />
      )}
      Connect Wallet
    </Button>
  );
}
