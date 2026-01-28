'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, AlertTriangle, Activity, Calendar } from 'lucide-react';
import { CollapsibleSidebar } from '@/components/layout/CollapsibleSidebar';
import { TopHeader } from '@/components/top-header';
import { mountains, alertLogs, historicalData, calculateMetrics } from '@/constants/data';

// Dynamic import for MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted rounded-xl flex items-center justify-center">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  )
});

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetrics(calculateMetrics());
      setLoading(false);
    };

    fetchData();
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

  return (
    <CollapsibleSidebar>
      <div className="flex flex-col min-h-screen bg-background">
        <TopHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Regional Satellite Monitoring
            </h1>
            <p className="text-muted-foreground text-lg">
              West Java Environmental Surveillance Platform
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Updated: June 25, 2024</span>
              </div>
            </div>
          </div>

          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {loading ? (
              <>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Forest Loss YoY
                    </CardTitle>
                    <TrendingDown className="h-4 w-4 text-rose-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      {metrics.totalHectaresLost} ha
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">2019 baseline vs 2024</p>
                    <div className="mt-4 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historicalData.slice(-6)}>
                          <Area 
                            type="monotone" 
                            dataKey="hectaresLost" 
                            stroke="#ef4444" 
                            fill="#ef4444" 
                            fillOpacity={0.2} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Alert Center
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      {metrics.criticalAlerts}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Critical alerts active</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge variant="destructive" className="bg-rose-500">
                        High Priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Requires immediate action
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Regional Health Score
                    </CardTitle>
                    <Activity className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      Grade {metrics.healthGrade}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.healthPercentage}% forest density retained
                    </p>
                    <div className="mt-4 w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metrics.healthGrade === 'A' ? 'bg-emerald-500' :
                          metrics.healthGrade === 'B' ? 'bg-green-500' :
                          metrics.healthGrade === 'C' ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${metrics.healthPercentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Map and Chart Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Regional Map Hub */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Regional Map Hub</span>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-rose-500 rounded-full" />
                      <span className="text-muted-foreground">Critical</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-amber-500 rounded-full" />
                      <span className="text-muted-foreground">Warning</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-emerald-500 rounded-full" />
                      <span className="text-muted-foreground">Stable</span>
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
                <CardTitle>Forest Coverage Trend (2019-2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))" 
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        style={{ fontSize: '12px' }}
                        label={{ 
                          value: 'Hectares', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { fill: 'hsl(var(--muted-foreground))' }
                        }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
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
                <p className="text-xs text-muted-foreground mt-2">
                  Total forest coverage across all monitored mountains in West Java region.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chronological Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Logs</CardTitle>
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
                      <TableCell className="text-sm">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.mountainName}
                      </TableCell>
                      <TableCell>{log.eventType}</TableCell>
                      <TableCell>{log.hectaresAffected} ha</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </CollapsibleSidebar>
  );
};

export default Dashboard;
