import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectCompletedLogs } from '@/features/serviceLogs/serviceLogsSlice';
import { filterServiceLogs } from '@/utils/serviceLog';
import { ServiceLogsToolbar, ServiceLogsFilters } from './ServiceLogsToolbar';
import { ServiceLogsTable } from './ServiceLogsTable';
import { ServiceLogEditDialog } from './ServiceLogEditDialog';

const defaultFilters: ServiceLogsFilters = {
  search: '',
  types: [],
  dateFrom: null,
  dateTo: null,
};

export const ServiceLogsView = () => {
  const allLogs = useAppSelector(selectCompletedLogs);
  const [filters, setFilters] = useState<ServiceLogsFilters>(defaultFilters);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const filteredLogs = useMemo(
    () => filterServiceLogs(allLogs, filters),
    [allLogs, filters],
  );

  return (
    <Box>
      <ServiceLogsToolbar
        filters={filters}
        onChange={setFilters}
        totalCount={allLogs.length}
        filteredCount={filteredLogs.length}
      />

      <ServiceLogsTable
        logs={filteredLogs}
        onRowClick={setSelectedLogId}
      />

      {selectedLogId && (
        <ServiceLogEditDialog
          logId={selectedLogId}
          onClose={() => setSelectedLogId(null)}
        />
      )}
    </Box>
  );
};
