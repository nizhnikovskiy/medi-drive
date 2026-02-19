import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import { ServiceLogEntry } from '@/types/serviceLog';
import { formatDate, capitalize, truncate } from '@/utils/format';
import { EmptyState } from '@/components/feedback/EmptyState';

interface ServiceLogsTableProps {
  logs: ServiceLogEntry[];
  onRowClick: (id: string) => void;
}

export const ServiceLogsTable = ({ logs, onRowClick }: ServiceLogsTableProps) => {
  if (logs.length === 0) {
    return (
      <EmptyState
        icon={<ListAlt sx={{ fontSize: 48 }} />}
        title="No service logs found"
        description="Completed service logs will appear here. Try adjusting your filters."
      />
    );
  }

  const handleRowKeyDown = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick(id);
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Provider ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Car ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Service Order</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              hover
              onClick={() => onRowClick(log.id)}
              onKeyDown={handleRowKeyDown(log.id)}
              tabIndex={0}
              role="button"
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{log.providerId || '—'}</TableCell>
              <TableCell>{log.carId || '—'}</TableCell>
              <TableCell>{log.serviceOrder || '—'}</TableCell>
              <TableCell>{log.type ? capitalize(log.type) : '—'}</TableCell>
              <TableCell>{formatDate(log.startDate)}</TableCell>
              <TableCell>{formatDate(log.endDate)}</TableCell>
              <TableCell sx={{ maxWidth: 240 }}>
                {truncate(log.serviceDescription)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
