import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DASHBOARD_COPY } from '@/components/dashboard/copy';
import { formatDashboardDate, renderStatusBadge } from '@/components/dashboard/utils';

const ActivityLogsTable = ({ alertLogs }) => (
  <Card className="bg-slate-900 border-slate-800">
    <CardHeader className="pb-3">
      <CardTitle className="text-white text-base md:text-lg">{DASHBOARD_COPY.recentActivityLogs}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3 md:hidden">
        {alertLogs.map((log) => (
          <div key={log.id} className="rounded-lg border border-slate-800 bg-slate-900 p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-white truncate">{log.mountainName}</p>
              <div className="shrink-0">{renderStatusBadge(log.status)}</div>
            </div>
            <p className="text-xs text-slate-400">{formatDashboardDate(log.timestamp)}</p>
            <p className="text-sm text-slate-300">{log.eventType}</p>
            <p className="text-sm text-slate-400">Dampak: {log.hectaresAffected} ha</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">Timestamp</TableHead>
              <TableHead className="text-slate-300">Gunung</TableHead>
              <TableHead className="text-slate-300">Jenis Kejadian</TableHead>
              <TableHead className="text-slate-300">Dampak</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alertLogs.map((log) => (
              <TableRow key={log.id} className="border-slate-800 hover:bg-slate-800/50">
                <TableCell className="text-slate-400 text-sm">{formatDashboardDate(log.timestamp)}</TableCell>
                <TableCell className="text-white font-medium">{log.mountainName}</TableCell>
                <TableCell className="text-slate-300">{log.eventType}</TableCell>
                <TableCell className="text-slate-300">{log.hectaresAffected} ha</TableCell>
                <TableCell>{renderStatusBadge(log.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default ActivityLogsTable;
