import { Request, Response } from 'express';
import { AnalyticsService } from '../../services/analytics.service';
import { AnalyticsEvent, EventType } from '../../types/analytics.types';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AnalyticsController {
  /**
   * Track a new analytics event
   */
  static async trackEvent(req: Request, res: Response): Promise<void> {
    try {
      const event: Omit<AnalyticsEvent, 'timestamp'> = req.body;
      
      // Add wallet address if authenticated
      const authReq = req as AuthenticatedRequest;
      if (authReq.user?.publicKey) {
        event.walletAddress = authReq.user.publicKey;
      }

      await AnalyticsService.trackEvent(event);
      res.status(201).json({ message: 'Event tracked successfully' });
    } catch (error) {
      console.error('Error tracking event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get analytics data
   */
  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const {
        startDate,
        endDate,
        eventTypes,
        walletAddress,
        limit,
        page
      } = req.query;

      const query = {
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        eventTypes: eventTypes ? (eventTypes as string).split(',') as EventType[] : undefined,
        walletAddress: walletAddress as string,
        limit: limit ? parseInt(limit as string) : undefined,
        page: page ? parseInt(page as string) : undefined
      };

      const results = await AnalyticsService.getAnalytics(query);
      res.json(results);
    } catch (error) {
      console.error('Error getting analytics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get event counts by type
   */
  static async getEventCounts(req: Request, res: Response): Promise<void> {
    try {
      const counts = await AnalyticsService.getEventCounts();
      res.json(counts);
    } catch (error) {
      console.error('Error getting event counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get unique wallet count
   */
  static async getUniqueWalletCount(req: Request, res: Response): Promise<void> {
    try {
      const count = await AnalyticsService.getUniqueWalletCount();
      res.json({ count });
    } catch (error) {
      console.error('Error getting unique wallet count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
