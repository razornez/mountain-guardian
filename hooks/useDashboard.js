/**
 * Custom React Hook for Dashboard Data Fetching
 * 
 * Provides a clean API for components to fetch data
 * with loading states and error handling.
 */

import { useState, useEffect } from 'react';
import { DashboardService } from '@/services/dashboardService';

/**
 * Generic hook for data fetching
 */
export function useDataFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const result = await fetchFn();

      if (isMounted) {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchFn();
    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching forest loss data
 */
export function useForestLoss() {
  return useDataFetch(DashboardService.fetchForestLossYoY);
}

/**
 * Hook for fetching alert center data
 */
export function useAlertCenter() {
  return useDataFetch(DashboardService.fetchAlertCenter);
}

/**
 * Hook for fetching regional health score
 */
export function useRegionalHealth() {
  return useDataFetch(DashboardService.fetchRegionalHealthScore);
}

/**
 * Hook for fetching map data
 */
export function useMapData() {
  return useDataFetch(DashboardService.fetchRegionalMapData);
}

/**
 * Hook for fetching forest coverage trend
 */
export function useCoverageTrend() {
  return useDataFetch(DashboardService.fetchForestCoverageTrend);
}

/**
 * Hook for fetching activity logs
 */
export function useActivityLogs(limit = 10) {
  return useDataFetch(
    () => DashboardService.fetchRecentActivityLogs(limit),
    [limit]
  );
}

/**
 * Hook for fetching mountain detail
 */
export function useMountainDetail(mountainId) {
  return useDataFetch(
    () => DashboardService.fetchMountainDetail(mountainId),
    [mountainId]
  );
}

/**
 * Hook for fetching complete dashboard summary
 */
export function useDashboardSummary() {
  return useDataFetch(DashboardService.fetchDashboardSummary);
}
