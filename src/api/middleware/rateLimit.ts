import rateLimit from 'express-rate-limit';

export const basicRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
});
