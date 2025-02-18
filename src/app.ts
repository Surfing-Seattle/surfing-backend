import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { basicRateLimiter } from './api/middleware/rateLimit';
import router from './api/routes/index';
import { initializeDatabases } from './config/database';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/', basicRateLimiter);
app.use('/', router);

// Initialize databases
initializeDatabases()
  .then(() => {
    console.log('All database connections established');
  })
  .catch((error) => {
    console.error('Failed to initialize databases:', error);
    process.exit(1);
  });

export default app;
