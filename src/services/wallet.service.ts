import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { WalletAuthRequest } from '../types/wallet.types';

export class WalletService {
  /**
   * Verify a Solana wallet signature
   * @param auth WalletAuthRequest containing publicKey, signature, and message
   * @returns boolean indicating if the signature is valid
   */
  static async verifySignature(auth: WalletAuthRequest): Promise<boolean> {
    try {
      // Convert the public key string to a PublicKey object
      const publicKey = new PublicKey(auth.publicKey);

      // Decode the signature from base58
      const signatureUint8 = bs58.decode(auth.signature);

      // Convert message to Uint8Array
      const messageUint8 = new TextEncoder().encode(auth.message);

      // Verify the signature
      return nacl.sign.detached.verify(
        messageUint8,
        signatureUint8,
        publicKey.toBytes()
      );
    } catch (error) {
      console.error('Error verifying wallet signature:', error);
      return false;
    }
  }

  /**
   * Generate a challenge message for wallet signing
   * @param publicKey wallet public key
   * @returns string message to be signed
   */
  static generateAuthMessage(publicKey: string): string {
    const timestamp = Date.now();
    return `Sign this message for authenticating with your wallet\nWallet: ${publicKey}\nTimestamp: ${timestamp}`;
  }
}
