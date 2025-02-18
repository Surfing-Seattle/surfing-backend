import { Router } from 'express';
import walletRoutes from './wallet.routes';
import protectedRoutes from './protected.routes';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Health check route
router.get('/', (_req, res) => {
  res.send('Surfing Backend is running!');
});

// Wallet routes
router.use('/api/v1/auth/wallet', walletRoutes);

// Protected routes
router.use('/api/v1/protected', authMiddleware, protectedRoutes);

export default router;
