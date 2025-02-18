import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
