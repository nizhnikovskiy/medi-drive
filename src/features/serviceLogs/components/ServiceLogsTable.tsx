import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import { ServiceLogEntry } from '@/types/serviceLog';

interface ServiceLogsTableProps {
  logs: ServiceLogEntry[];
  onRowClick: (id: string) => void;
}

const formatDate = (iso: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const truncate = (s: string, max = 60) =>
  s.length > max ? `${s.slice(0, max)}…` : s || '—';

export const ServiceLogsTable = ({ logs, onRowClick }: ServiceLogsTableProps) => {
  if (logs.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
        <ListAlt sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No service logs found
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Completed service logs will appear here. Try adjusting your filters.
        </Typography>
      </Box>
    );
  }

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
