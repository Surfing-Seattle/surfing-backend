import { AnalyticsModel } from '../models/analytics.model';
import { AnalyticsEvent, AnalyticsQuery, EventType } from '../types/analytics.types';
import { redisClient } from '../config/database';

export class AnalyticsService {
  private static readonly CACHE_TTL = 60 * 5; // 5 minutes

  /**
   * Track a new analytics event
   */
  static async trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    try {
      await AnalyticsModel.create({
        ...event,
        timestamp: new Date()
      });

      // Invalidate relevant caches
      await this.invalidateCache(event.eventType);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
      throw error;
    }
  }

  /**
   * Get analytics data based on query parameters
   */
  static async getAnalytics(query: AnalyticsQuery) {
    const cacheKey = `analytics:${JSON.stringify(query)}`;
    
    // Try to get from cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Build MongoDB query
    const mongoQuery: any = {};
    
    if (query.startDate || query.endDate) {
      mongoQuery.timestamp = {};
      if (query.startDate) mongoQuery.timestamp.$gte = query.startDate;
      if (query.endDate) mongoQuery.timestamp.$lte = query.endDate;
    }

    if (query.eventTypes?.length) {
      mongoQuery.eventType = { $in: query.eventTypes };
    }

    if (query.walletAddress) {
      mongoQuery.walletAddress = query.walletAddress;
    }

    // Execute query
    const results = await AnalyticsModel.find(mongoQuery)
      .sort({ timestamp: -1 })
      .limit(query.limit || 100)
      .skip(((query.page || 1) - 1) * (query.limit || 100));

    // Cache results
    await redisClient.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(results));

    return results;
  }

  /**
   * Get event counts by type
   */
  static async getEventCounts(): Promise<Record<EventType, number>> {
    const cacheKey = 'analytics:event_counts';
    
    // Try to get from cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const counts = await AnalyticsModel.getEventCounts();
    
    // Cache results
    await redisClient.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(counts));

    return counts;
  }

  /**
   * Get unique wallet addresses count
   */
  static async getUniqueWalletCount(): Promise<number> {
    const cacheKey = 'analytics:unique_wallets';
    
    // Try to get from cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return parseInt(cached);
    }

    const count = await AnalyticsModel.distinct('walletAddress').length;
    
    // Cache results
    await redisClient.setEx(cacheKey, this.CACHE_TTL, count.toString());

    return count;
  }

  /**
   * Invalidate cache for specific event type
   */
  private static async invalidateCache(eventType: EventType): Promise<void> {
    const keys = await redisClient.keys('analytics:*');
    if (keys.length) {
      await redisClient.del(keys);
    }
  }
}