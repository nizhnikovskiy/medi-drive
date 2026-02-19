import dayjs from 'dayjs';
import { ServiceLogFormValues, ServiceType } from '../../types/serviceLog';

export const getEmptyFormValues = (): ServiceLogFormValues => ({
  providerId: '',
  serviceOrder: '',
  carId: '',
  odometer: '',
  engineHours: '',
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  type: ServiceType.Planned,
  serviceDescription: '',
});
