# Simplified Analytics Dashboard Design

## 1. Core Components

### 1.1 Backend
```typescript
// Simple event tracking
interface EventTracker {
  trackEvent(event: AnalyticsEvent): Promise<void>;
  getEvents(query: EventQuery): Promise<Event[]>;
}

// Basic caching
interface CacheManager {
  getCachedMetrics(): Promise<Metrics>;
  updateCache(metrics: Metrics): Promise<void>;
}

// AI module (part of main service)
interface AIAnalytics {
  analyzeTrends(timeframe: string): Promise<Trends>;
  detectAnomalies(): Promise<Anomaly[]>;
}
```

### 1.2 Frontend
```typescript
// Single chart library
import { LineChart, BarChart, AreaChart } from 'recharts';

// Essential real-time updates
const useRealtimeMetrics = () => {
  // WebSocket for critical metrics only
  const socket = useSocket('/metrics');
  return {
    activeUsers,
    currentPurchases,
    trafficLevel
  };
};

// Polling for non-critical
const usePolledData = (endpoint: string, interval = 30000) => {
  // Regular HTTP polling for historical data
};
```

## 2. Data Flow

1. Event Collection
   - Direct MongoDB write
   - Redis cache for real-time counters
   - No message queue initially

2. Data Access
   - REST API for historical data
   - WebSocket for critical real-time metrics
   - Polling for non-critical updates

3. AI Processing
   - Runs as scheduled tasks
   - Part of main service
   - Uses existing MongoDB data

## 3. Implementation Phases

### Phase 1: Core Analytics (Week 1-2)
- Event tracking
- Basic metrics
- Essential real-time updates
- Simple dashboard UI

### Phase 2: Enhanced Features (Week 3-4)
- AI insights module
- Additional charts
- Export functionality

### Phase 3: Optimization (If Needed)
- Move AI to separate service
- Add message queue
- Enhanced real-time capabilities
