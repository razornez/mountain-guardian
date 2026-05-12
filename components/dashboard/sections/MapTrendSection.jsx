import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { DASHBOARD_COPY } from '@/components/dashboard/copy';

const MapTrendSection = ({ MapView, mountains, historicalData }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>{DASHBOARD_COPY.mapHub}</span>
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 bg-rose-500 rounded-full" />
              <span className="text-slate-400">{DASHBOARD_COPY.critical}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 bg-amber-500 rounded-full" />
              <span className="text-slate-400">{DASHBOARD_COPY.warning}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 bg-emerald-500 rounded-full" />
              <span className="text-slate-400">{DASHBOARD_COPY.stable}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <MapView mountains={mountains} />
        </div>
        <p className="text-xs text-slate-400 mt-2">{DASHBOARD_COPY.mapHint}</p>
      </CardContent>
    </Card>

    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">{DASHBOARD_COPY.trendTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
                label={{ value: 'Hectares', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="forestCoverage" stroke="#10b981" strokeWidth={2} name="Forest Coverage" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-2">{DASHBOARD_COPY.trendHint}</p>
      </CardContent>
    </Card>
  </div>
);

export default MapTrendSection;
