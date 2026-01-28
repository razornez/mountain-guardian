/**
 * Dashboard Service
 * 
 * Handles all data fetching for the Mountain Guardian dashboard.
 * Implements mock API calls with realistic delays.
 * Following SOLID principles with single responsibility.
 */

import { delay } from '@/lib/utils';
import { mountains, alertLogs, historicalData, calculateMetrics } from '@/constants/data';

/**
 * Configuration for API simulation
 */
const API_DELAY = {
  short: 800,    // For simple queries
  medium: 1500,  // For complex queries
  long: 2500,    // For data-heavy queries
};

/**
 * Error simulation (5% failure rate for realistic behavior)
 */
const shouldSimulateError = () => Math.random() < 0.05;

/**
 * Base fetch function with error handling
 */
async function baseFetch(dataFn, delayMs = API_DELAY.medium) {
  try {
    await delay(delayMs);
    
    if (shouldSimulateError()) {
      throw new Error('Network error: Unable to fetch data');
    }
    
    const data = dataFn();
    return {
      success: true,
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Fetch Total Forest Loss YoY
 * Returns: Total hectares lost from 2019 baseline to 2024
 */
export async function fetchForestLossYoY() {
  return baseFetch(() => {
    const totalLost = mountains.reduce((sum, m) => sum + m.hectaresLost, 0);
    const total2019 = mountains.reduce((sum, m) => sum + m.forestCoverage2019, 0);
    const total2024 = mountains.reduce((sum, m) => sum + m.forestCoverage2024, 0);
    const percentageLoss = ((totalLost / total2019) * 100).toFixed(2);
    
    return {
      totalHectaresLost: totalLost,
      baseline2019: total2019,
      current2024: total2024,
      percentageLoss: parseFloat(percentageLoss),
      trend: 'declining',
      sparklineData: historicalData.slice(-6).map(h => h.hectaresLost),
    };
  }, API_DELAY.short);
}

/**
 * Fetch Alert Center Data
 * Returns: Critical alerts count and breakdown
 */
export async function fetchAlertCenter() {
  return baseFetch(() => {
    const criticalCount = mountains.filter(m => m.status === 'critical').length;
    const warningCount = mountains.filter(m => m.status === 'warning').length;
    const stableCount = mountains.filter(m => m.status === 'stable').length;
    const recentActivityCount = mountains.filter(m => m.recentActivity).length;
    
    const criticalMountains = mountains
      .filter(m => m.status === 'critical')
      .map(m => ({
        id: m.id,
        name: m.name,
        alertCount: m.alertCount,
        hectaresLost: m.hectaresLost,
      }));
    
    return {
      criticalAlerts: criticalCount,
      warningAlerts: warningCount,
      stableAlerts: stableCount,
      recentActivity: recentActivityCount,
      criticalMountains,
      priority: criticalCount > 0 ? 'high' : warningCount > 0 ? 'medium' : 'low',
      requiresAction: criticalCount > 0,
    };
  }, API_DELAY.short);
}

/**
 * Fetch Regional Health Score
 * Returns: Overall health grade and metrics
 */
export async function fetchRegionalHealthScore() {
  return baseFetch(() => {
    const metrics = calculateMetrics();
    const total2019 = mountains.reduce((sum, m) => sum + m.forestCoverage2019, 0);
    const total2024 = mountains.reduce((sum, m) => sum + m.forestCoverage2024, 0);
    const avgNDVI = mountains.reduce((sum, m) => sum + m.ndviScore, 0) / mountains.length;
    
    return {
      healthGrade: metrics.healthGrade,
      healthPercentage: parseFloat(metrics.healthPercentage),
      totalForestCoverage2019: total2019,
      totalForestCoverage2024: total2024,
      averageNDVI: parseFloat(avgNDVI.toFixed(2)),
      status: metrics.healthGrade === 'A' || metrics.healthGrade === 'B' ? 'good' : 
              metrics.healthGrade === 'C' ? 'moderate' : 'poor',
      recommendation: metrics.healthGrade === 'F' ? 'Immediate intervention required' :
                      metrics.healthGrade === 'D' ? 'Increased monitoring needed' :
                      metrics.healthGrade === 'C' ? 'Continue current efforts' :
                      'Maintain conservation programs',
    };
  }, API_DELAY.medium);
}

/**
 * Fetch Regional Map Hub Data
 * Returns: All mountains with coordinates and status
 */
export async function fetchRegionalMapData() {
  return baseFetch(() => {
    const mapData = mountains.map(m => ({
      id: m.id,
      name: m.name,
      region: m.region,
      coordinates: m.coordinates,
      status: m.status,
      recentActivity: m.recentActivity,
      alertCount: m.alertCount,
      hectaresLost: m.hectaresLost,
      ndviScore: m.ndviScore,
      elevation: m.elevation || 0,
      conservationZone: m.conservationZone || 'None',
    }));
    
    return {
      mountains: mapData,
      totalMountains: mapData.length,
      criticalZones: mapData.filter(m => m.status === 'critical').length,
      centerCoordinates: [-6.9, 107.6] as [number, number],
      zoomLevel: 9,
    };
  }, API_DELAY.medium);
}

/**
 * Fetch Forest Coverage Trend (2019-2024)
 * Returns: Historical data for charts
 */
export async function fetchForestCoverageTrend() {
  return baseFetch(() => {
    const trendData = historicalData.map(h => ({
      year: h.year,
      month: h.month,
      forestCoverage: h.forestCoverage,
      hectaresLost: h.hectaresLost,
      date: `${h.year}-${h.month}`,
    }));
    
    // Calculate trend analysis
    const firstYear = trendData[0].forestCoverage;
    const lastYear = trendData[trendData.length - 1].forestCoverage;
    const totalChange = lastYear - firstYear;
    const percentageChange = ((totalChange / firstYear) * 100).toFixed(2);
    
    return {
      trendData,
      analysis: {
        startYear: 2019,
        endYear: 2024,
        initialCoverage: firstYear,
        currentCoverage: lastYear,
        totalChange,
        percentageChange: parseFloat(percentageChange),
        trend: totalChange < 0 ? 'declining' : 'stable',
        averageAnnualLoss: (Math.abs(totalChange) / 5).toFixed(2),
      },
    };
  }, API_DELAY.long);
}

/**
 * Fetch Recent Activity Logs
 * Returns: Latest alert logs
 */
export async function fetchRecentActivityLogs(limit = 10) {
  return baseFetch(() => {
    const logs = alertLogs.slice(0, limit).map(log => ({
      id: log.id,
      timestamp: log.timestamp,
      mountainName: log.mountainName,
      mountainId: log.mountainId,
      eventType: log.eventType,
      status: log.status,
      hectaresAffected: log.hectaresAffected,
      severity: log.status === 'critical' ? 'high' : 
                log.status === 'warning' ? 'medium' : 'low',
    }));
    
    return {
      logs,
      totalCount: alertLogs.length,
      lastUpdate: logs[0]?.timestamp || new Date().toISOString(),
    };
  }, API_DELAY.short);
}

/**
 * Fetch Mountain Detail by ID
 * Returns: Detailed information for a specific mountain
 */
export async function fetchMountainDetail(mountainId) {
  return baseFetch(() => {
    const mountain = mountains.find(m => m.id === mountainId);
    
    if (!mountain) {
      throw new Error(`Mountain with ID ${mountainId} not found`);
    }
    
    // Generate historical data for this mountain
    const mountainHistory = [
      { year: 2019, coverage: mountain.forestCoverage2019, ndvi: 0.75 },
      { year: 2020, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.2), ndvi: 0.71 },
      { year: 2021, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.4), ndvi: 0.67 },
      { year: 2022, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.6), ndvi: 0.60 },
      { year: 2023, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.8), ndvi: 0.52 },
      { year: 2024, coverage: mountain.forestCoverage2024, ndvi: mountain.ndviScore },
    ];
    
    return {
      ...mountain,
      historicalData: mountainHistory,
      lossPercentage: ((mountain.hectaresLost / mountain.forestCoverage2019) * 100).toFixed(1),
      conservationStatus: mountain.conservationZone || 'Unprotected',
      lastScanDateFormatted: new Date(mountain.lastScanDate).toLocaleDateString(),
    };
  }, API_DELAY.medium);
}

/**
 * Fetch Dashboard Summary (All metrics at once)
 * Returns: Complete dashboard data
 */
export async function fetchDashboardSummary() {
  return baseFetch(async () => {
    // Simulate parallel fetching
    const [forestLoss, alerts, healthScore, mapData, trend, activityLogs] = await Promise.all([
      fetchForestLossYoY(),
      fetchAlertCenter(),
      fetchRegionalHealthScore(),
      fetchRegionalMapData(),
      fetchForestCoverageTrend(),
      fetchRecentActivityLogs(),
    ]);
    
    return {
      forestLoss: forestLoss.data,
      alerts: alerts.data,
      healthScore: healthScore.data,
      mapData: mapData.data,
      trend: trend.data,
      activityLogs: activityLogs.data,
      lastUpdate: new Date().toISOString(),
    };
  }, API_DELAY.long);
}

/**
 * Export all services as a single object
 */
export const DashboardService = {
  fetchForestLossYoY,
  fetchAlertCenter,
  fetchRegionalHealthScore,
  fetchRegionalMapData,
  fetchForestCoverageTrend,
  fetchRecentActivityLogs,
  fetchMountainDetail,
  fetchDashboardSummary,
};
