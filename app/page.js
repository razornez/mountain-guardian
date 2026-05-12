'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mountains, alertLogs, historicalData, calculateMetrics } from '@/constants/data';
import { DASHBOARD_COPY } from '@/components/dashboard/copy';
import { DASHBOARD_CONSTANTS } from '@/components/dashboard/constants';
import KpiCards from '@/components/dashboard/sections/KpiCards';
import MapTrendSection from '@/components/dashboard/sections/MapTrendSection';
import ActivityLogsTable from '@/components/dashboard/sections/ActivityLogsTable';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-800 rounded-xl flex items-center justify-center">
      <div className="text-slate-400">{DASHBOARD_COPY.mapLoading}</div>
    </div>
  ),
});

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    setMetrics(calculateMetrics());
  }, []);

  if (!metrics) {
    return (
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 lg:ml-72 p-8">
          <div className="text-white">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-72 overflow-y-auto w-full lg:w-auto">
        <div
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/40996/south-america-continent-land-map-40996.jpeg)',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
          <div className="relative h-full flex flex-col justify-center px-8">
            <h1 className="text-4xl font-bold text-white mb-2">{DASHBOARD_COPY.heroTitle}</h1>
            <p className="text-slate-300 text-lg">{DASHBOARD_COPY.heroSubtitle}</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">{DASHBOARD_COPY.systemOnline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {DASHBOARD_COPY.lastUpdatedLabel} {DASHBOARD_CONSTANTS.LAST_UPDATED}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <KpiCards metrics={metrics} historicalData={historicalData} />
          <MapTrendSection MapView={MapView} mountains={mountains} historicalData={historicalData} />
          <ActivityLogsTable alertLogs={alertLogs} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
