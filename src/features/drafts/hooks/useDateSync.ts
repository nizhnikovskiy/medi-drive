import { useEffect } from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import dayjs from 'dayjs';
import { ServiceLogFormValues } from '@/types/serviceLog.ts';
import { DATE_FORMAT } from '@/constants';

interface UseDateSyncProps {
  watch: UseFormWatch<ServiceLogFormValues>;
  setValue: UseFormSetValue<ServiceLogFormValues>;
}

/**
 * Auto-sets endDate to startDate + 1 day only when endDate is empty
 * or falls before the new startDate, preserving deliberate user edits.
 */
export const useDateSync = ({ watch, setValue }: UseDateSyncProps) => {
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (!startDate) return;

    const shouldSync = !endDate || dayjs(endDate).isBefore(dayjs(startDate));
    if (shouldSync) {
      setValue('endDate', dayjs(startDate).add(1, 'day').format(DATE_FORMAT), {
        shouldValidate: false,
      });
    }
  }, [startDate, endDate, setValue]);
};
