import React from 'react';
import { TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DASHBOARD_COPY } from '@/components/dashboard/copy';
import { DASHBOARD_CONSTANTS } from '@/components/dashboard/constants';

const KpiCards = ({ metrics, historicalData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{DASHBOARD_COPY.totalForestLoss}</CardTitle>
        <TrendingDown className="h-4 w-4 text-rose-500" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{metrics.totalHectaresLost} ha</div>
        <p className="text-xs text-slate-400 mt-1">2019 baseline vs 2024</p>
        <div className="mt-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData.slice(-DASHBOARD_CONSTANTS.RECENT_HECTARES_LOST_POINTS)}>
              <Area type="monotone" dataKey="hectaresLost" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{DASHBOARD_COPY.alertCenter}</CardTitle>
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{metrics.criticalAlerts}</div>
        <p className="text-xs text-slate-400 mt-1">{DASHBOARD_COPY.critical} alerts active</p>
        <div className="mt-4 flex items-center space-x-2">
          <Badge variant="destructive" className="bg-rose-500">{DASHBOARD_COPY.highPriority}</Badge>
          <span className="text-xs text-slate-400">{DASHBOARD_COPY.requiresImmediateAction}</span>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{DASHBOARD_COPY.regionalHealthScore}</CardTitle>
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
          />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default KpiCards;
