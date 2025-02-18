import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';

const router = Router();

// Get challenge message for wallet signing
router.get('/challenge', WalletController.getAuthChallenge);

// Verify wallet signature
router.post('/verify', WalletController.verifyWallet);

export default router;
