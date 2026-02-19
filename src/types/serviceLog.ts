export enum ServiceType {
  Planned = 'planned',
  Unplanned = 'unplanned',
  Emergency = 'emergency',
}

export enum ServiceLogStatus {
  Draft = 'draft',
  Completed = 'completed',
}

export interface ServiceLogFormValues {
  providerId: string;
  serviceOrder: string;
  carId: string;
  odometer: number | '';
  engineHours: number | '';
  startDate: string; // ISO date string YYYY-MM-DD
  endDate: string;
  type: ServiceType;
  serviceDescription: string;
}

export interface ServiceLogEntry extends ServiceLogFormValues {
  kind: 'serviceLog';
  status: ServiceLogStatus;
  id: string; // nanoid from @reduxjs/toolkit
  createdAt: string;
  updatedAt: string;
}
