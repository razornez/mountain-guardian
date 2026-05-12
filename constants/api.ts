/**
 * API Configuration and Endpoints
 * Centralized API URL management
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  mountains: {
    list: `${API_BASE_URL}/mountains`,
    detail: (id: string) => `${API_BASE_URL}/mountains/${id}`,
  },
  alerts: {
    list: `${API_BASE_URL}/alerts`,
    recent: `${API_BASE_URL}/alerts/recent`,
  },
  metrics: {
    dashboard: `${API_BASE_URL}/metrics/dashboard`,
    historical: `${API_BASE_URL}/metrics/historical`,
  },
  conservation: {
    zones: `${API_BASE_URL}/conservation/zones`,
  },
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
