/**
 * Type Definitions for Mountain Guardian Dashboard
 * Following SOLID principles with clear interfaces
 */

export interface Mountain {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  status: 'critical' | 'warning' | 'stable';
  forestCoverage2019: number;
  forestCoverage2024: number;
  hectaresLost: number;
  lastScanDate: string;
  recentActivity: boolean;
  ndviScore: number;
  alertCount: number;
  elevation?: number;
  conservationZone?: string;
}

export interface AlertLog {
  id: string;
  timestamp: string;
  mountainName: string;
  mountainId: string;
  eventType: string;
  status: 'critical' | 'warning' | 'stable';
  hectaresAffected: number;
}

export interface HistoricalData {
  year: number;
  month: string;
  forestCoverage: number;
  hectaresLost: number;
}

export interface DashboardMetrics {
  totalHectaresLost: number;
  criticalAlerts: number;
  healthGrade: string;
  healthPercentage: string;
}

export interface ConservationZone {
  id: string;
  name: string;
  type: 'national_park' | 'protected_forest' | 'wildlife_reserve';
  forestCoverage: number;
  coordinates: [number, number][];
  status: 'healthy' | 'at_risk' | 'critical';
}

export interface WeatherOverlay {
  mountainId: string;
  condition: 'clear' | 'rain' | 'snow' | 'cloudy';
  temperature: number;
}
