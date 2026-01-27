'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, AlertTriangle, TrendingDown, Calendar, MapPin, Activity } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mountains } from '@/constants/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MountainDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [mountain, setMountain] = useState(null);
  const [timelineYear, setTimelineYear] = useState(2024);
  const [comparisonMode, setComparisonMode] = useState(true);

  useEffect(() => {
    const foundMountain = mountains.find(m => m.id === params.id);
    setMountain(foundMountain);
  }, [params.id]);

  if (!mountain) {
    return (
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        <main className="flex-1 lg:ml-72 p-8">
          <div className="text-white">Mountain not found</div>
        </main>
      </div>
    );
  }

  const getStatusColor = (status) => {
    return status === 'critical' ? 'text-rose-500' :
           status === 'warning' ? 'text-amber-500' :
           'text-emerald-500';
  };

  const getStatusBg = (status) => {
    return status === 'critical' ? 'bg-rose-500' :
           status === 'warning' ? 'bg-amber-500' :
           'bg-emerald-500';
  };

  // Generate historical data for this mountain
  const mountainHistory = [
    { year: 2019, coverage: mountain.forestCoverage2019, ndvi: 0.75 },
    { year: 2020, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.2), ndvi: 0.71 },
    { year: 2021, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.4), ndvi: 0.67 },
    { year: 2022, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.6), ndvi: 0.60 },
    { year: 2023, coverage: mountain.forestCoverage2019 - (mountain.hectaresLost * 0.8), ndvi: 0.52 },
    { year: 2024, coverage: mountain.forestCoverage2024, ndvi: mountain.ndviScore },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const lossPercentage = ((mountain.hectaresLost / mountain.forestCoverage2019) * 100).toFixed(1);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 overflow-y-auto">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="text-slate-300 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{mountain.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{mountain.region}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Last Scan: {formatDate(mountain.lastScanDate)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-medium mb-2 ${getStatusColor(mountain.status)}`}>
                Status: {mountain.status.toUpperCase()}
              </div>
              {mountain.recentActivity && (
                <Badge variant="destructive" className="bg-rose-500">
                  <Activity className="h-3 w-3 mr-1" />
                  Activity Detected (7 days)
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Forest Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-500">{mountain.hectaresLost} ha</div>
                <p className="text-xs text-slate-500 mt-1">{lossPercentage}% reduction</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">NDVI Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(mountain.status)}`}>
                  {mountain.ndviScore.toFixed(2)}
                </div>
                <p className="text-xs text-slate-500 mt-1">Vegetation health index</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mountain.alertCount}</div>
                <p className="text-xs text-slate-500 mt-1">Requires monitoring</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Current Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">{mountain.forestCoverage2024} ha</div>
                <p className="text-xs text-slate-500 mt-1">vs {mountain.forestCoverage2019} ha (2019)</p>
              </CardContent>
            </Card>
          </div>

          {/* Split-Screen Comparison */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Satellite Imagery Comparison</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={comparisonMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setComparisonMode(true)}
                    className="text-xs"
                  >
                    Split View
                  </Button>
                  <Button 
                    variant={!comparisonMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setComparisonMode(false)}
                    className="text-xs"
                  >
                    Single View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-4 ${comparisonMode ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* 2019 Baseline */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-slate-950/80 text-white border-slate-700">
                      2019 Baseline
                    </Badge>
                  </div>
                  <div 
                    className="h-80 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1521251825860-9d8e9aca7bb6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxhZXJpYWwlMjBtb3VudGFpbnN8ZW58MHx8fGdyZWVufDE3Njk0OTUxMDl8MA&ixlib=rb-4.1.0&q=85)',
                      filter: 'brightness(1.1) saturate(1.2)'
                    }}
                  >
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-lg"></div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="text-slate-400 text-xs">Forest Coverage</div>
                      <div className="text-white font-bold">{mountain.forestCoverage2019} ha</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="text-slate-400 text-xs">NDVI Score</div>
                      <div className="text-emerald-500 font-bold">0.75</div>
                    </div>
                  </div>
                </div>

                {/* 2024 Current */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${getStatusBg(mountain.status)} text-white`}>
                      2024 Current
                    </Badge>
                  </div>
                  <div 
                    className="h-80 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1570835143075-c1d6a367c53d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxhZXJpYWwlMjBtb3VudGFpbnN8ZW58MHx8fGdyZWVufDE3Njk0OTUxMDl8MA&ixlib=rb-4.1.0&q=85)',
                      filter: mountain.status === 'critical' ? 'brightness(0.8) saturate(0.7) sepia(0.3) hue-rotate(-10deg)' : 
                              mountain.status === 'warning' ? 'brightness(0.9) saturate(0.85)' : 
                              'brightness(1.0) saturate(1.1)'
                    }}
                  >
                    <div className={`absolute inset-0 rounded-lg ${
                      mountain.status === 'critical' ? 'bg-rose-500/10' :
                      mountain.status === 'warning' ? 'bg-amber-500/10' :
                      'bg-emerald-500/10'
                    }`}></div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="text-slate-400 text-xs">Forest Coverage</div>
                      <div className="text-white font-bold">{mountain.forestCoverage2024} ha</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="text-slate-400 text-xs">NDVI Score</div>
                      <div className={`font-bold ${getStatusColor(mountain.status)}`}>
                        {mountain.ndviScore.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Detection Summary */}
              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2 text-rose-500" />
                  Change Detection Analysis
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Forest Loss</div>
                    <div className="text-rose-500 font-bold text-lg">{mountain.hectaresLost} ha</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Loss Percentage</div>
                    <div className="text-amber-500 font-bold text-lg">{lossPercentage}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400">NDVI Change</div>
                    <div className="text-rose-500 font-bold text-lg">-{((0.75 - mountain.ndviScore) * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Control */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Historical Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Selected Year:</span>
                  <span className="text-white font-bold text-lg">{timelineYear}</span>
                </div>
                <Slider
                  value={[timelineYear]}
                  onValueChange={(value) => setTimelineYear(value[0])}
                  min={2019}
                  max={2024}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>2019</span>
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
              </div>

              {/* Historical Chart */}
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mountainHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#94a3b8" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      style={{ fontSize: '12px' }}
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
                      dataKey="coverage" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Forest Coverage (ha)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ndvi" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="NDVI Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alert Information */}
          {mountain.status !== 'stable' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${getStatusColor(mountain.status)}`} />
                  Alert Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          {mountain.status === 'critical' ? 'Critical Deforestation Detected' : 'Warning: Forest Thinning Observed'}
                        </h4>
                        <p className="text-sm text-slate-400">
                          Satellite analysis indicates {mountain.status === 'critical' ? 'significant land clearing' : 'gradual vegetation loss'} in the monitored area.
                        </p>
                      </div>
                      <Badge className={`${getStatusBg(mountain.status)} text-white`}>
                        {mountain.alertCount} alerts
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800 rounded">
                      <div className="text-slate-400 text-xs mb-1">Recommended Action</div>
                      <div className="text-white text-sm">
                        {mountain.status === 'critical' ? 'Immediate ground verification required' : 'Continue monitoring'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800 rounded">
                      <div className="text-slate-400 text-xs mb-1">Priority Level</div>
                      <div className={`text-sm font-semibold ${getStatusColor(mountain.status)}`}>
                        {mountain.status === 'critical' ? 'HIGH' : 'MEDIUM'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MountainDetailPage;
