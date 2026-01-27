'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, AlertTriangle, Activity, Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mountains, alertLogs, historicalData, calculateMetrics } from '@/constants/data';

// Dynamic import for MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-800 rounded-xl flex items-center justify-center">
      <div className="text-slate-400">Loading map...</div>
    </div>
  )
});

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    setMetrics(calculateMetrics());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      critical: 'destructive',
      warning: 'default',
      stable: 'secondary'
    };
    return (
      <Badge variant={variants[status]} className={`capitalize ${
        status === 'critical' ? 'bg-rose-500 hover:bg-rose-600' :
        status === 'warning' ? 'bg-amber-500 hover:bg-amber-600' :
        'bg-emerald-500 hover:bg-emerald-600'
      }`}>
        {status}
      </Badge>
    );
  };

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
      
      <main className="flex-1 lg:ml-72 overflow-y-auto">
        {/* Hero Section with Background */}
        <div 
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/40996/south-america-continent-land-map-40996.jpeg)',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
          <div className="relative h-full flex flex-col justify-center px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Regional Satellite Monitoring</h1>
            <p className="text-slate-300 text-lg">West Java Environmental Surveillance Platform</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">Last Updated: June 25, 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Forest Loss YoY</CardTitle>
                <TrendingDown className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{metrics.totalHectaresLost} ha</div>
                <p className="text-xs text-slate-400 mt-1">2019 baseline vs 2024</p>
                <div className="mt-4 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(-6)}>
                      <Area type="monotone" dataKey="hectaresLost" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Alert Center</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{metrics.criticalAlerts}</div>
                <p className="text-xs text-slate-400 mt-1">Critical alerts active</p>
                <div className="mt-4 flex items-center space-x-2">
                  <Badge variant="destructive" className="bg-rose-500">High Priority</Badge>
                  <span className="text-xs text-slate-400">Requires immediate action</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Regional Health Score</CardTitle>
                <Activity className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">Grade {metrics.healthGrade}</div>
                <p className="text-xs text-slate-400 mt-1">{metrics.healthPercentage}% forest density retained</p>
                <div className="mt-4 w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metrics.healthGrade === 'A' ? 'bg-emerald-500' :
                      metrics.healthGrade === 'B' ? 'bg-green-500' :
                      metrics.healthGrade === 'C' ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}
                    style={{ width: `${metrics.healthPercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Chart Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Regional Map Hub */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Regional Map Hub</span>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-rose-500 rounded-full"></div>
                      <span className="text-slate-400">Critical</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-400">Warning</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-400">Stable</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <MapView mountains={mountains} />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Click markers to view detailed analysis. Red pulse indicates activity in last 7 days.
                </p>
              </CardContent>
            </Card>

            {/* Destruction Trend Chart */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Forest Coverage Trend (2019-2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94a3b8" 
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        style={{ fontSize: '12px' }}
                        label={{ value: 'Hectares', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #334155',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#f1f5f9' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forestCoverage" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Forest Coverage"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Total forest coverage across all monitored mountains in West Java region.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chronological Logs Table */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Timestamp</TableHead>
                    <TableHead className="text-slate-300">Mountain</TableHead>
                    <TableHead className="text-slate-300">Event Type</TableHead>
                    <TableHead className="text-slate-300">Impact</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertLogs.map((log) => (
                    <TableRow key={log.id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {log.mountainName}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {log.eventType}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {log.hectaresAffected} ha
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(log.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
