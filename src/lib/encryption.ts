import nacl from 'tweetnacl';
import { encodeBase64, decodeBase64, encodeUTF8, decodeUTF8 } from 'tweetnacl-util';

export interface EncryptedPayload {
  nonce: string;
  ephemeralPublicKey: string;
  ciphertext: string;
}

export interface PayrollData {
  employeeWallet: string;
  amount: number;
  currency: string;
  period: string;
  notes?: string;
  timestamp: number;
}

/**
 * Encrypt payroll data using the recipient's public key.
 * Uses NaCl box (curve25519xsalsa20poly1305)
 */
export function encryptPayroll(
  data: PayrollData,
  recipientPublicKey: Uint8Array
): EncryptedPayload {
  // Generate ephemeral keypair for this encryption
  const ephemeralKeyPair = nacl.box.keyPair();
  
  // Generate random nonce
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  
  // Encode the data as JSON
  const message = decodeUTF8(JSON.stringify(data));
  
  // Encrypt with recipient's public key
  const ciphertext = nacl.box(
    message,
    nonce,
    recipientPublicKey,
    ephemeralKeyPair.secretKey
  );
  
  if (!ciphertext) {
    throw new Error('Encryption failed');
  }
  
  return {
    nonce: encodeBase64(nonce),
    ephemeralPublicKey: encodeBase64(ephemeralKeyPair.publicKey),
    ciphertext: encodeBase64(ciphertext),
  };
}

/**
 * Decrypt payroll data using the recipient's secret key.
 */
export function decryptPayroll(
  encrypted: EncryptedPayload,
  recipientSecretKey: Uint8Array
): PayrollData {
  const nonce = decodeBase64(encrypted.nonce);
  const ephemeralPublicKey = decodeBase64(encrypted.ephemeralPublicKey);
  const ciphertext = decodeBase64(encrypted.ciphertext);
  
  const decrypted = nacl.box.open(
    ciphertext,
    nonce,
    ephemeralPublicKey,
    recipientSecretKey
  );
  
  if (!decrypted) {
    throw new Error('Decryption failed - invalid key or corrupted data');
  }
  
  return JSON.parse(encodeUTF8(decrypted));
}

/**
 * Generate a keypair for demo purposes
 */
export function generateKeyPair(): { publicKey: Uint8Array; secretKey: Uint8Array } {
  return nacl.box.keyPair();
}

/**
 * Format a public key for display (truncated)
 */
export function formatPublicKey(key: Uint8Array | string): string {
  const base64 = typeof key === 'string' ? key : encodeBase64(key);
  return `${base64.slice(0, 8)}...${base64.slice(-6)}`;
}

/**
 * Convert public key to base64 string
 */
export function publicKeyToBase64(key: Uint8Array): string {
  return encodeBase64(key);
}

/**
 * Convert base64 string to public key
 */
export function base64ToPublicKey(base64: string): Uint8Array {
  return decodeBase64(base64);
}
