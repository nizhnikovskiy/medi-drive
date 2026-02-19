import * as yup from 'yup';
import { ServiceType } from '../types/serviceLog';

export const serviceLogSchema = yup.object({
  providerId: yup
    .string()
    .trim()
    .required('Provider ID is required'),
  serviceOrder: yup
    .string()
    .trim()
    .required('Service order is required'),
  carId: yup
    .string()
    .trim()
    .required('Car ID is required'),
  odometer: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Odometer must be a number')
    .positive('Odometer must be a positive number')
    .required('Odometer is required'),
  engineHours: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Engine hours must be a number')
    .positive('Engine hours must be a positive number')
    .required('Engine hours is required'),
  startDate: yup
    .string()
    .trim()
    .required('Start date is required'),
  endDate: yup
    .string()
    .trim()
    .required('End date is required')
    .test(
      'is-after-start',
      'End date must be after start date',
      (endDate, context) => {
        const { startDate } = context.parent as { startDate: string };
        if (!startDate || !endDate) return true;
        return new Date(endDate) > new Date(startDate);
      },
    ),
  type: yup
    .mixed<ServiceType>()
    .oneOf(Object.values(ServiceType), 'Invalid service type')
    .required('Service type is required'),
  serviceDescription: yup
    .string()
    .trim()
    .required('Service description is required'),
});
