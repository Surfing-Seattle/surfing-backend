export enum EventType {
  PAGE_VIEW = 'page_view',
  WALLET_CONNECT = 'wallet_connect',
  WALLET_DISCONNECT = 'wallet_disconnect',
  BUY_BUTTON_CLICK = 'buy_button_click',
  JUPITER_SWAP_INITIATED = 'jupiter_swap_initiated',
  JUPITER_SWAP_COMPLETED = 'jupiter_swap_completed',
  COPY_CONTRACT_ADDRESS = 'copy_contract_address',
  SOCIAL_LINK_CLICK = 'social_link_click',
  EXTERNAL_LINK_CLICK = 'external_link_click'
}

export interface AnalyticsEvent {
  eventType: EventType;
  timestamp: Date;
  walletAddress?: string;
  sessionId: string;
  data: {
    url?: string;
    buttonId?: string;
    socialPlatform?: string;
    swapAmount?: number;
    userAgent?: string;
    referrer?: string;
    [key: string]: any;
  };
}

export interface AnalyticsQuery {
  startDate?: Date;
  endDate?: Date;
  eventTypes?: EventType[];
  walletAddress?: string;
  limit?: number;
  page?: number;
}
