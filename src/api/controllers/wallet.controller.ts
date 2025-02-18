import { Request, Response } from 'express';
import { WalletService } from '../../services/wallet.service';
import { WalletAuthRequest } from '../../types/wallet.types';

export class WalletController {
  /**
   * Generate a challenge message for wallet signing
   */
  static async getAuthChallenge(req: Request, res: Response): Promise<void> {
    try {
      const { publicKey } = req.query;

      if (!publicKey || typeof publicKey !== 'string') {
        res.status(400).json({ error: 'Public key is required' });
        return;
      }

      const message = WalletService.generateAuthMessage(publicKey);
      res.json({ message });
    } catch (error) {
      console.error('Error generating auth challenge:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Verify wallet signature and authenticate user
   */
  static async verifyWallet(req: Request, res: Response): Promise<void> {
    try {
      const auth: WalletAuthRequest = req.body;

      if (!auth.publicKey || !auth.signature || !auth.message) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const isValid = await WalletService.verifySignature(auth);

      if (!isValid) {
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      // TODO: Generate JWT token here
      res.json({
        message: 'Wallet verified successfully',
        publicKey: auth.publicKey
      });
    } catch (error) {
      console.error('Error verifying wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
