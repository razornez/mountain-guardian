'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, AlertTriangle, Activity, Calendar } from 'lucide-react';
import { mountains, alertLogs, historicalData, calculateMetrics } from '@/constants/data';

// Dynamic import for MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted rounded-xl flex items-center justify-center transition-colors duration-300">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  )
});

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMetrics(calculateMetrics());
  }, []);

  const isDark = resolvedTheme === 'dark';
  const chartTooltipStyle = isDark
    ? { backgroundColor: 'hsl(222.2, 84%, 8%)', border: '1px solid hsl(217.2, 32.6%, 17.5%)', borderRadius: '8px' }
    : { backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(214.3, 31.8%, 91.4%)', borderRadius: '8px' };
  const chartLabelStyle = { color: isDark ? 'hsl(210, 40%, 98%)' : 'hsl(222.2, 47.4%, 11.2%)' };
  const chartGridStroke = isDark ? '#334155' : '#e2e8f0';
  const chartAxisStroke = isDark ? '#94a3b8' : '#64748b';

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
      <div className="p-8">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col transition-colors duration-300">
          {/* Hero Section with Background */}
          <div 
            className="relative h-64 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/40996/south-america-continent-land-map-40996.jpeg)',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
            <div className="relative h-full flex flex-col justify-center px-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Regional Satellite Monitoring</h1>
              <p className="text-muted-foreground text-lg">West Java Environmental Surveillance Platform</p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last Updated: June 25, 2024</span>
                </div>
              </div>
            </div>
          </div>

        <div className="p-8 space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Total Forest Loss YoY</CardTitle>
                <TrendingDown className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">{metrics.totalHectaresLost} ha</div>
                <p className="text-xs text-muted-foreground mt-1">2019 baseline vs 2024</p>
                <div className="mt-4 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(-6)}>
                      <Area type="monotone" dataKey="hectaresLost" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Alert Center</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">{metrics.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground mt-1">Critical alerts active</p>
                <div className="mt-4 flex items-center space-x-2">
                  <Badge variant="destructive">High Priority</Badge>
                  <span className="text-xs text-muted-foreground">Requires immediate action</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Regional Health Score</CardTitle>
                <Activity className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">Grade {metrics.healthGrade}</div>
                <p className="text-xs text-muted-foreground mt-1">{metrics.healthPercentage}% forest density retained</p>
                <div className="mt-4 w-full bg-muted rounded-full h-2">
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
            <Card>
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center justify-between">
                  <span>Regional Map Hub</span>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-rose-500 rounded-full" />
                      <span>Critical</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-amber-500 rounded-full" />
                      <span>Warning</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-emerald-500 rounded-full" />
                      <span>Stable</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <MapView mountains={mountains} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Click markers to view detailed analysis. Red pulse indicates activity in last 7 days.
                </p>
              </CardContent>
            </Card>

            {/* Destruction Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-card-foreground">Forest Coverage Trend (2019-2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                      <XAxis
                        dataKey="month"
                        stroke={chartAxisStroke}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis
                        stroke={chartAxisStroke}
                        style={{ fontSize: '12px' }}
                        label={{ value: 'Hectares', angle: -90, position: 'insideLeft', fill: chartAxisStroke }}
                      />
                      <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartLabelStyle} />
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
                <p className="text-xs text-muted-foreground mt-2">
                  Total forest coverage across all monitored mountains in West Java region.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chronological Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Mountain</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium text-card-foreground">
                        {log.mountainName}
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {log.eventType}
                      </TableCell>
                      <TableCell className="text-card-foreground">
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
    </div>
  );
};

export default Dashboard;
