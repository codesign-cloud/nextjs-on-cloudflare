// API Response Types
export interface ServerInfoData {
  serverId: string;
  serverTime: string;
  requestId: string;
  environment: string;
  timestamp: number;
}

export interface ServerInfoResponse {
  success: boolean;
  data: ServerInfoData;
  metadata: {
    requestTime: string;
    responseTime: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    timestamp: string;
  };
}

// Component Props
export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[]>;
}

// Server Component Data
export interface SSRPageData {
  serverRenderTime: string;
  initialServerInfo: ServerInfoData;
  pageMetadata: {
    title: string;
    description: string;
  };
}

// Navigation component props
export interface NavigationProps {
  currentPath: string;
}

// Route configuration
export interface RouteConfig {
  path: string;
  label: string;
  description: string;
}

// API Data Fetcher component props
export interface ApiDataFetcherProps {
  initialData?: ServerInfoData;
}

export interface ApiDataFetcherState {
  data: ServerInfoData | null;
  loading: boolean;
  error: string | null;
}