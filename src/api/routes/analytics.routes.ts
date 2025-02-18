import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { rateLimiter } from '../middleware/rateLimit';

const router = Router();

// Public endpoints with rate limiting
router.post('/track', rateLimiter, AnalyticsController.trackEvent);

// Protected endpoints
router.get('/data', authMiddleware, AnalyticsController.getAnalytics);
router.get('/counts', authMiddleware, AnalyticsController.getEventCounts);
router.get('/wallets/count', authMiddleware, AnalyticsController.getUniqueWalletCount);

export default router;
