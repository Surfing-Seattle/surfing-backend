import { Router } from 'express';
import walletRoutes from './wallet.routes';

const router = Router();

// Health check route
router.get('/', (_req, res) => {
  res.send('Surfing Backend is running!');
});

// Wallet routes
router.use('/api/v1/auth/wallet', walletRoutes);

export default router;
