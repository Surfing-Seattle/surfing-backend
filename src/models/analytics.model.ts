import mongoose, { Schema, Document, Model } from 'mongoose';
import { AnalyticsEvent, EventType } from '../types/analytics.types';

export interface AnalyticsDocument extends AnalyticsEvent, Document {}

interface AnalyticsModel extends Model<AnalyticsDocument> {
  findByDateRange(startDate: Date, endDate: Date): Promise<AnalyticsDocument[]>;
  findByWalletAddress(walletAddress: string): Promise<AnalyticsDocument[]>;
  getEventCounts(): Promise<Record<EventType, number>>;
}

const analyticsSchema = new Schema<AnalyticsDocument, AnalyticsModel>({
  eventType: {
    type: String,
    enum: Object.values(EventType),
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  walletAddress: {
    type: String,
    index: true,
    sparse: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  data: {
    url: String,
    buttonId: String,
    socialPlatform: String,
    swapAmount: Number,
    userAgent: String,
    referrer: String
  }
}, {
  timestamps: true
});

// Static methods
analyticsSchema.statics.findByDateRange = function(startDate: Date, endDate: Date) {
  return this.find({
    timestamp: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ timestamp: -1 });
};

analyticsSchema.statics.findByWalletAddress = function(walletAddress: string) {
  return this.find({ walletAddress }).sort({ timestamp: -1 });
};

analyticsSchema.statics.getEventCounts = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$eventType',
        count: { $sum: 1 }
      }
    }
  ]).then((results) => {
    return results.reduce((acc, { _id, count }) => {
      acc[_id as EventType] = count;
      return acc;
    }, {} as Record<EventType, number>);
  });
};

export const AnalyticsModel = mongoose.model<AnalyticsDocument, AnalyticsModel>('Analytics', analyticsSchema);
