export const formatDate = (iso: string): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (iso: string): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const truncate = (s: string, max = 60): string =>
  s.length > max ? `${s.slice(0, max)}…` : s || '—';
