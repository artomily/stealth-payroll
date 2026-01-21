import { useWallet, WalletMode } from '@/contexts/WalletContext';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { mode, setMode, connected } = useWallet();

  const modes: { value: WalletMode; label: string; description: string }[] = [
    { value: 'mock', label: 'Demo', description: 'Simulated' },
    { value: 'devnet', label: 'Devnet', description: 'Real blockchain' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg border border-border">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          disabled={connected}
          className={cn(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            mode === m.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
            connected && 'opacity-50 cursor-not-allowed'
          )}
          title={connected ? 'Disconnect wallet to change mode' : m.description}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
