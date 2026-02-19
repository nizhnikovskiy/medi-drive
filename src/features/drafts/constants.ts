import dayjs from 'dayjs';
import { ServiceLogFormValues, ServiceType } from '@/types/serviceLog.ts';
import { DATE_FORMAT } from '@/constants';

export const getEmptyFormValues = (): ServiceLogFormValues => ({
  providerId: '',
  serviceOrder: '',
  carId: '',
  odometer: '',
  engineHours: '',
  startDate: dayjs().format(DATE_FORMAT),
  endDate: dayjs().add(1, 'day').format(DATE_FORMAT),
  type: ServiceType.Planned,
  serviceDescription: '',
});
