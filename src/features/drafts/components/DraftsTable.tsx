import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { ServiceLogEntry } from '@/types/serviceLog';
import { formatDate, formatDateTime, capitalize } from '@/utils/format';
import { EmptyState } from '@/components/feedback/EmptyState';

interface DraftsTableProps {
  drafts: ServiceLogEntry[];
  onRowClick: (id: string) => void;
}

export const DraftsTable = ({ drafts, onRowClick }: DraftsTableProps) => {
  if (drafts.length === 0) {
    return (
      <EmptyState
        icon={<EditNote sx={{ fontSize: 48 }} />}
        title="No drafts yet"
        description="Drafts you save from the Create tab will appear here."
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
            <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drafts.map((draft) => (
            <TableRow
              key={draft.id}
              hover
              onClick={() => onRowClick(draft.id)}
              onKeyDown={handleRowKeyDown(draft.id)}
              tabIndex={0}
              role="button"
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
