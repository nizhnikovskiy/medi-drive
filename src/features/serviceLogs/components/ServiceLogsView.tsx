import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectCompletedLogs } from '@/features/serviceLogs/serviceLogsSlice';
import { ServiceType } from '@/types/serviceLog';
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

  const filteredLogs = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return allLogs.filter((log) => {
      if (q) {
        const haystack = [
          log.providerId,
          log.carId,
          log.serviceOrder,
          log.serviceDescription,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (filters.types.length > 0 && !filters.types.includes(log.type as ServiceType)) {
        return false;
      }

      if (filters.dateFrom && log.startDate < filters.dateFrom) return false;
      return !(filters.dateTo && log.startDate > filters.dateTo);


    });
  }, [allLogs, filters]);

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
