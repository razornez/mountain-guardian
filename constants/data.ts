// MonitorGunung.com - West Java Mountain Monitoring Data

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

// West Java Mountains Data
export const mountains: Mountain[] = [
  {
    id: 'baleendah',
    name: 'Gunung Baleendah',
    region: 'Bandung Regency',
    coordinates: [-7.0376, 107.6451],
    status: 'critical',
    forestCoverage2019: 850,
    forestCoverage2024: 612,
    hectaresLost: 238,
    lastScanDate: '2024-06-24T14:30:00Z',
    recentActivity: true,
    ndviScore: 0.42,
    alertCount: 8
  },
  {
    id: 'manglayang',
    name: 'Gunung Manglayang',
    region: 'Bandung',
    coordinates: [-6.9147, 107.7238],
    status: 'warning',
    forestCoverage2019: 1240,
    forestCoverage2024: 1089,
    hectaresLost: 151,
    lastScanDate: '2024-06-23T10:15:00Z',
    recentActivity: true,
    ndviScore: 0.58,
    alertCount: 4
  },
  {
    id: 'gede',
    name: 'Gunung Gede',
    region: 'Bogor',
    coordinates: [-6.7808, 106.9809],
    status: 'stable',
    forestCoverage2019: 3450,
    forestCoverage2024: 3398,
    hectaresLost: 52,
    lastScanDate: '2024-06-22T08:45:00Z',
    recentActivity: false,
    ndviScore: 0.81,
    alertCount: 1
  },
  {
    id: 'papandayan',
    name: 'Gunung Papandayan',
    region: 'Garut',
    coordinates: [-7.3197, 107.7302],
    status: 'warning',
    forestCoverage2019: 2150,
    forestCoverage2024: 1987,
    hectaresLost: 163,
    lastScanDate: '2024-06-25T16:20:00Z',
    recentActivity: true,
    ndviScore: 0.61,
    alertCount: 5
  },
  {
    id: 'ciremai',
    name: 'Gunung Ciremai',
    region: 'Cirebon',
    coordinates: [-6.8920, 108.4062],
    status: 'stable',
    forestCoverage2019: 4200,
    forestCoverage2024: 4165,
    hectaresLost: 35,
    lastScanDate: '2024-06-21T12:00:00Z',
    recentActivity: false,
    ndviScore: 0.79,
    alertCount: 0
  },
  {
    id: 'tangkuban-perahu',
    name: 'Gunung Tangkuban Perahu',
    region: 'Subang',
    coordinates: [-6.7697, 107.6098],
    status: 'critical',
    forestCoverage2019: 1850,
    forestCoverage2024: 1523,
    hectaresLost: 327,
    lastScanDate: '2024-06-25T18:45:00Z',
    recentActivity: true,
    ndviScore: 0.39,
    alertCount: 12
  },
  {
    id: 'burangrang',
    name: 'Gunung Burangrang',
    region: 'Purwakarta',
    coordinates: [-6.7833, 107.5333],
    status: 'warning',
    forestCoverage2019: 980,
    forestCoverage2024: 876,
    hectaresLost: 104,
    lastScanDate: '2024-06-24T09:30:00Z',
    recentActivity: true,
    ndviScore: 0.55,
    alertCount: 3
  },
  {
    id: 'salak',
    name: 'Gunung Salak',
    region: 'Bogor',
    coordinates: [-6.7194, 106.7353],
    status: 'stable',
    forestCoverage2019: 2890,
    forestCoverage2024: 2845,
    hectaresLost: 45,
    lastScanDate: '2024-06-20T15:10:00Z',
    recentActivity: false,
    ndviScore: 0.77,
    alertCount: 1
  }
];

// Alert Logs for last 30 days
export const alertLogs: AlertLog[] = [
  {
    id: 'log-001',
    timestamp: '2024-06-25T18:45:00Z',
    mountainName: 'Gunung Tangkuban Perahu',
    mountainId: 'tangkuban-perahu',
    eventType: 'Land Clearing Detected',
    status: 'critical',
    hectaresAffected: 24
  },
  {
    id: 'log-002',
    timestamp: '2024-06-25T16:20:00Z',
    mountainName: 'Gunung Papandayan',
    mountainId: 'papandayan',
    eventType: 'Vegetation Loss',
    status: 'warning',
    hectaresAffected: 12
  },
  {
    id: 'log-003',
    timestamp: '2024-06-24T14:30:00Z',
    mountainName: 'Gunung Baleendah',
    mountainId: 'baleendah',
    eventType: 'Land Clearing Detected',
    status: 'critical',
    hectaresAffected: 18
  },
  {
    id: 'log-004',
    timestamp: '2024-06-24T09:30:00Z',
    mountainName: 'Gunung Burangrang',
    mountainId: 'burangrang',
    eventType: 'Forest Thinning',
    status: 'warning',
    hectaresAffected: 8
  },
  {
    id: 'log-005',
    timestamp: '2024-06-23T10:15:00Z',
    mountainName: 'Gunung Manglayang',
    mountainId: 'manglayang',
    eventType: 'Vegetation Loss',
    status: 'warning',
    hectaresAffected: 15
  },
  {
    id: 'log-006',
    timestamp: '2024-06-22T08:45:00Z',
    mountainName: 'Gunung Gede',
    mountainId: 'gede',
    eventType: 'Minor Changes',
    status: 'stable',
    hectaresAffected: 3
  },
  {
    id: 'log-007',
    timestamp: '2024-06-21T12:00:00Z',
    mountainName: 'Gunung Ciremai',
    mountainId: 'ciremai',
    eventType: 'Routine Scan',
    status: 'stable',
    hectaresAffected: 0
  },
  {
    id: 'log-008',
    timestamp: '2024-06-20T15:10:00Z',
    mountainName: 'Gunung Salak',
    mountainId: 'salak',
    eventType: 'Minor Changes',
    status: 'stable',
    hectaresAffected: 2
  },
  {
    id: 'log-009',
    timestamp: '2024-06-19T11:30:00Z',
    mountainName: 'Gunung Tangkuban Perahu',
    mountainId: 'tangkuban-perahu',
    eventType: 'Land Clearing Detected',
    status: 'critical',
    hectaresAffected: 31
  },
  {
    id: 'log-010',
    timestamp: '2024-06-18T14:20:00Z',
    mountainName: 'Gunung Baleendah',
    mountainId: 'baleendah',
    eventType: 'Vegetation Loss',
    status: 'critical',
    hectaresAffected: 19
  }
];

// Historical Data 2019-2024
export const historicalData: HistoricalData[] = [
  { year: 2019, month: 'Jan', forestCoverage: 17610, hectaresLost: 0 },
  { year: 2019, month: 'Jul', forestCoverage: 17580, hectaresLost: 30 },
  { year: 2020, month: 'Jan', forestCoverage: 17495, hectaresLost: 85 },
  { year: 2020, month: 'Jul', forestCoverage: 17385, hectaresLost: 110 },
  { year: 2021, month: 'Jan', forestCoverage: 17240, hectaresLost: 145 },
  { year: 2021, month: 'Jul', forestCoverage: 17050, hectaresLost: 190 },
  { year: 2022, month: 'Jan', forestCoverage: 16845, hectaresLost: 205 },
  { year: 2022, month: 'Jul', forestCoverage: 16590, hectaresLost: 255 },
  { year: 2023, month: 'Jan', forestCoverage: 16310, hectaresLost: 280 },
  { year: 2023, month: 'Jul', forestCoverage: 15980, hectaresLost: 330 },
  { year: 2024, month: 'Jan', forestCoverage: 15625, hectaresLost: 355 },
  { year: 2024, month: 'Jun', forestCoverage: 15495, hectaresLost: 130 }
];

// Calculate total metrics
export const calculateMetrics = () => {
  const totalHectaresLost = mountains.reduce((sum, m) => sum + m.hectaresLost, 0);
  const criticalAlerts = mountains.filter(m => m.status === 'critical').length;
  const totalForest2019 = mountains.reduce((sum, m) => sum + m.forestCoverage2019, 0);
  const totalForest2024 = mountains.reduce((sum, m) => sum + m.forestCoverage2024, 0);
  const healthPercentage = (totalForest2024 / totalForest2019) * 100;
  
  let healthGrade = 'A';
  if (healthPercentage < 95) healthGrade = 'B';
  if (healthPercentage < 90) healthGrade = 'C';
  if (healthPercentage < 85) healthGrade = 'D';
  if (healthPercentage < 80) healthGrade = 'F';
  
  return {
    totalHectaresLost,
    criticalAlerts,
    healthGrade,
    healthPercentage: healthPercentage.toFixed(1)
  };
};
