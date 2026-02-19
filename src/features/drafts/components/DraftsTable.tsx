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
import { EditNote } from '@mui/icons-material';
import { ServiceLogEntry } from '@/types/serviceLog';

interface DraftsTableProps {
  drafts: ServiceLogEntry[];
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

const formatDateTime = (iso: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const DraftsTable = ({ drafts, onRowClick }: DraftsTableProps) => {
  if (drafts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
        <EditNote sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No drafts yet
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Drafts you save from the Create tab will appear here.
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
            <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drafts.map((draft) => (
            <TableRow
              key={draft.id}
              hover
              onClick={() => onRowClick(draft.id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{draft.providerId || '—'}</TableCell>
              <TableCell>{draft.carId || '—'}</TableCell>
              <TableCell>{draft.serviceOrder || '—'}</TableCell>
              <TableCell>{draft.type ? capitalize(draft.type) : '—'}</TableCell>
              <TableCell>{formatDate(draft.startDate)}</TableCell>
              <TableCell>{formatDateTime(draft.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
