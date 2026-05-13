import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DASHBOARD_COPY } from '@/components/dashboard/copy';
import { formatDashboardDate, renderStatusBadge } from '@/components/dashboard/utils';

const ActivityLogsTable = ({ alertLogs }) => (
  <Card className="bg-slate-900 border-slate-800">
    <CardHeader>
      <CardTitle className="text-white">{DASHBOARD_COPY.recentActivityLogs}</CardTitle>
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
              <TableCell className="text-slate-400 text-sm">{formatDashboardDate(log.timestamp)}</TableCell>
              <TableCell className="text-white font-medium">{log.mountainName}</TableCell>
              <TableCell className="text-slate-300">{log.eventType}</TableCell>
              <TableCell className="text-slate-300">{log.hectaresAffected} ha</TableCell>
              <TableCell>{renderStatusBadge(log.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default ActivityLogsTable;
