import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { Response } from 'express';

const router = Router();

router.get('/profile', (req: AuthenticatedRequest, res: Response) => {
  // This route will only be accessible with a valid JWT token
  res.json({
    message: 'Protected route accessed successfully',
    wallet: req.user?.publicKey
  });
});

export default router;
