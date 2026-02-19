import { ServiceLogEntry, ServiceLogFormValues, ServiceType } from '@/types/serviceLog';
import type { ServiceLogsFilters } from '@/features/serviceLogs/components/ServiceLogsToolbar';

export const toFormValues = (entry: ServiceLogEntry): ServiceLogFormValues => {
  const { id: _, kind: _k, status: _s, createdAt: _c, updatedAt: _u, ...formValues } = entry;
  return formValues;
};

export const filterServiceLogs = (
  logs: ServiceLogEntry[],
  filters: ServiceLogsFilters,
): ServiceLogEntry[] => {
  const q = filters.search.trim().toLowerCase();

  return logs.filter((log) => {
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
    if (filters.dateTo && log.startDate > filters.dateTo) return false;

    return true;
  });
};
