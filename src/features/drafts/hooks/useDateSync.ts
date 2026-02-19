import { useEffect } from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import dayjs from 'dayjs';
import { ServiceLogFormValues } from '@/types/serviceLog.ts';

interface UseDateSyncProps {
  watch: UseFormWatch<ServiceLogFormValues>;
  setValue: UseFormSetValue<ServiceLogFormValues>;
}

export const useDateSync = ({ watch, setValue }: UseDateSyncProps) => {
  const startDate = watch('startDate');

  useEffect(() => {
    if (startDate) {
      const endDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD');
      setValue('endDate', endDate, { shouldValidate: false });
    }
  }, [startDate, setValue]);
};
