/**
 * Mock Solana transactions for demo purposes
 * In production, this would use @solana/web3.js
 */

export interface MockTransaction {
  signature: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  encryptedDataRef: string;
}

// Simulated transaction store
const transactions: MockTransaction[] = [];

/**
 * Generate a mock Solana signature
 */
function generateMockSignature(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let signature = '';
  for (let i = 0; i < 88; i++) {
    signature += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return signature;
}

/**
 * Generate a mock Solana wallet address
 */
export function generateMockWallet(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

/**
 * Simulate sending a payroll transaction
 */
export async function sendPayrollTransaction(
  from: string,
  to: string,
  encryptedDataRef: string
): Promise<MockTransaction> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const transaction: MockTransaction = {
    signature: generateMockSignature(),
    from,
    to,
    amount: 1, // Fixed amount for privacy - real amount in encrypted data
    timestamp: Date.now(),
    status: 'confirmed',
    encryptedDataRef,
  };
  
  transactions.push(transaction);
  return transaction;
}

/**
 * Get all transactions (for demo)
 */
export function getTransactions(): MockTransaction[] {
  return [...transactions];
}

/**
 * Get transactions for a specific wallet
 */
export function getTransactionsForWallet(wallet: string): MockTransaction[] {
  return transactions.filter(tx => tx.from === wallet || tx.to === wallet);
}

/**
 * Format wallet address for display
 */
export function formatWalletAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get Solscan URL for transaction
 */
export function getSolscanUrl(signature: string, devnet = true): string {
  const cluster = devnet ? '?cluster=devnet' : '';
  return `https://solscan.io/tx/${signature}${cluster}`;
}
