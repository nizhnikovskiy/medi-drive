import { ServiceType } from '@/types/serviceLog';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const SERVICE_TYPE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: ServiceType.Planned, label: 'Planned' },
  { value: ServiceType.Unplanned, label: 'Unplanned' },
  { value: ServiceType.Emergency, label: 'Emergency' },
];

export const AUTO_SAVE_DEBOUNCE_MS = 750;
export const SAVED_INDICATOR_MS = 2000;
export const SNACKBAR_AUTO_HIDE_MS = 4000;
export const FADE_TIMEOUT_MS = 300;
export const TABLE_TRUNCATE_MAX = 60;
