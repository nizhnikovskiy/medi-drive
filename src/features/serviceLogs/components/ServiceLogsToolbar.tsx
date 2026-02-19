import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ServiceType } from '@/types/serviceLog';
import { SERVICE_TYPE_OPTIONS, DATE_FORMAT } from '@/constants';

export interface ServiceLogsFilters {
  search: string;
  types: ServiceType[];
  dateFrom: string | null;
  dateTo: string | null;
}

interface ServiceLogsToolbarProps {
  filters: ServiceLogsFilters;
  onChange: (filters: ServiceLogsFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export const ServiceLogsToolbar = ({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: ServiceLogsToolbarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleTypeToggle = (type: ServiceType) => {
    const next = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types: next });
  };

  const handleDateFrom = (date: Dayjs | null) => {
    onChange({ ...filters, dateFrom: date ? date.format(DATE_FORMAT) : null });
  };

  const handleDateTo = (date: Dayjs | null) => {
    onChange({ ...filters, dateTo: date ? date.format(DATE_FORMAT) : null });
  };

  const isFiltered =
    filters.search !== '' ||
    filters.types.length > 0 ||
    filters.dateFrom !== null ||
    filters.dateTo !== null;

  const logLabel = totalCount === 1 ? 'log' : 'logs';
  const countText = isFiltered
    ? `${filteredCount} of ${totalCount} ${logLabel}`
    : `${totalCount} ${logLabel}`;

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <TextField
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search provider, car, order, description…"
          size="small"
          sx={{ flexGrow: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <DatePicker
          label="From"
          value={filters.dateFrom ? dayjs(filters.dateFrom) : null}
          onChange={handleDateFrom}
          slotProps={{
            textField: { size: 'small', sx: { width: 160 } },
          }}
        />

        <DatePicker
          label="To"
          value={filters.dateTo ? dayjs(filters.dateTo) : null}
          onChange={handleDateTo}
          slotProps={{
            textField: { size: 'small', sx: { width: 160 } },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
          Type:
        </Typography>
        {SERVICE_TYPE_OPTIONS.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            size="small"
            onClick={() => handleTypeToggle(value)}
            color={filters.types.includes(value) ? 'primary' : 'default'}
            variant={filters.types.includes(value) ? 'filled' : 'outlined'}
            sx={{ cursor: 'pointer' }}
          />
        ))}

        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {countText}
        </Typography>
      </Box>
    </Stack>
  );
};
