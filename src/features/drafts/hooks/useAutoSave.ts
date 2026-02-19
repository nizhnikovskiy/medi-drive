import { useEffect, useRef, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { ServiceLogFormValues } from '@/types/serviceLog';
import { AUTO_SAVE_DEBOUNCE_MS, SAVED_INDICATOR_MS } from '@/constants';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved';

interface UseAutoSaveProps {
  watch: UseFormWatch<ServiceLogFormValues>;
  onAutoSave?: (data: ServiceLogFormValues) => void;
  debounceMs?: number;
}

export const useAutoSave = ({
  watch,
  onAutoSave,
  debounceMs = AUTO_SAVE_DEBOUNCE_MS,
}: UseAutoSaveProps) => {
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>('idle');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(onAutoSave);

  useEffect(() => {
    callbackRef.current = onAutoSave;
  });

  const enabled = !!onAutoSave;

  useEffect(() => {
    if (!enabled) return;

    const subscription = watch((formData) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (savedRef.current) clearTimeout(savedRef.current);

      setAutoSaveStatus('saving');

      debounceRef.current = setTimeout(() => {
        callbackRef.current?.(formData as ServiceLogFormValues);
        setAutoSaveStatus('saved');

        savedRef.current = setTimeout(() => {
          setAutoSaveStatus('idle');
        }, SAVED_INDICATOR_MS);
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (savedRef.current) clearTimeout(savedRef.current);
    };
  }, [watch, enabled, debounceMs]);

  return { autoSaveStatus };
};
