import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { basicRateLimiter } from './api/middleware/rateLimit';
import redisClient from './utils/redis';
import router from './api/routes/index';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/', basicRateLimiter);
app.use('/', router);

// Initialize Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err: Error) => console.error('Redis Connection Error:', err));

// Initialize MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kimchi';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('MongoDB Connection Error:', err));

export default app;
