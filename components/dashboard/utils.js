import { Badge } from '@/components/ui/badge';
import { STATUS_BADGE_CLASS, STATUS_VARIANT } from '@/components/dashboard/constants';

export const formatDashboardDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const renderStatusBadge = (status) => (
  <Badge variant={STATUS_VARIANT[status]} className={`capitalize ${STATUS_BADGE_CLASS[status]}`}>
    {status}
  </Badge>
);
