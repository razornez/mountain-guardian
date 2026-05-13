import { Badge } from '@/components/ui/badge';
import { STATUS_BADGE_CLASS, STATUS_VARIANT } from '@/components/dashboard/constants';

const STATUS_LABEL = {
  critical: 'Kritis',
  warning: 'Waspada',
  stable: 'Stabil',
};

export const formatDashboardDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const renderStatusBadge = (status) => (
  <Badge variant={STATUS_VARIANT[status]} className={`whitespace-nowrap capitalize ${STATUS_BADGE_CLASS[status]}`}>
    {STATUS_LABEL[status] || status}
  </Badge>
);
