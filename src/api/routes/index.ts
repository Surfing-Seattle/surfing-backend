import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Surfing Backend is running!');
});

export default router;
