import { Request, Response } from 'express';
import { WalletService } from '../../services/wallet.service';
import { JWTService } from '../../services/jwt.service';
import { UserService } from '../../services/user.service';
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
      const auth = req.body as WalletAuthRequest;

      if (!auth.publicKey || !auth.signature || !auth.message) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const isValid = await WalletService.verifySignature(auth);

      if (!isValid) {
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      // Find or create user
      const user = await UserService.findOrCreateByWallet(auth.publicKey);

      // Generate JWT token
      const token = JWTService.generateToken(auth.publicKey);

      res.json({
        token,
        expiresIn: 24 * 60 * 60, // 24 hours in seconds
        publicKey: auth.publicKey,
        userId: user._id
      });
    } catch (error) {
      console.error('Error verifying wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
