import mongoose from 'mongoose';
import { createClient, RedisClientType } from 'redis';

export let redisClient: RedisClientType;

export const initializeDatabases = async () => {
  // MongoDB setup
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/surfing';
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit if MongoDB connection fails
  }

  // Redis setup
  redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379',
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis Connection Error:', error);
    process.exit(1); // Exit if Redis connection fails
  }
};
