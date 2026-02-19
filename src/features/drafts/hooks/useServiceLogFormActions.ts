import { useEffect, useRef, useCallback } from 'react';
import { UseFormHandleSubmit, UseFormReset, UseFormWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  addServiceLog,
  addDraft,
  setCurrentFormState,
  selectCurrentFormState,
} from '../../serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog.ts';
import { useSnackbar } from '@/components/feedback/SnackbarProvider.tsx';
import { getEmptyFormValues } from '../constants';
import { useAutoSave } from './useAutoSave';

interface UseServiceLogFormActionsProps {
  handleSubmit: UseFormHandleSubmit<ServiceLogFormValues>;
  reset: UseFormReset<ServiceLogFormValues>;
  watch: UseFormWatch<ServiceLogFormValues>;
  enabled?: boolean;
}

export const useServiceLogFormActions = ({
  handleSubmit,
  reset,
  watch,
  enabled = true,
}: UseServiceLogFormActionsProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const currentFormState = useAppSelector(selectCurrentFormState);

  const handleAutoSave = useCallback(
    (data: ServiceLogFormValues) => {
      dispatch(setCurrentFormState(data));
    },
    [dispatch]
  );

  const { autoSaveStatus } = useAutoSave({
    watch,
    onAutoSave: enabled ? handleAutoSave : undefined,
  });

  // Restore persisted form state on initial mount only.
  // deps are deliberately empty — this is a one-time mount restoration.
  const initialFormStateRef = useRef(currentFormState);
  useEffect(() => {
    if (enabled && initialFormStateRef.current) {
      reset(initialFormStateRef.current);
    }
  }, [enabled, reset]);

  const onSubmit = useCallback(
    (data: ServiceLogFormValues) => {
      try {
        dispatch(addServiceLog(data));
        dispatch(setCurrentFormState(null));
        reset(getEmptyFormValues());
        showSnackbar('Service log created successfully', 'success');
      } catch {
        showSnackbar('Failed to create service log', 'error');
      }
    },
    [dispatch, reset, showSnackbar]
  );

  const handleCreateServiceLog = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const handleSaveDraft = useCallback(() => {
    const formData = watch();

    const hasContent =
      formData.providerId?.trim() !== '' ||
      formData.serviceOrder?.trim() !== '' ||
      formData.carId?.trim() !== '' ||
      formData.odometer !== '' ||
      formData.engineHours !== '' ||
      formData.serviceDescription?.trim() !== '';

    if (!hasContent) {
      showSnackbar('Cannot save empty draft', 'warning');
      return;
    }

    try {
      dispatch(addDraft(formData as ServiceLogFormValues));
      dispatch(setCurrentFormState(null));
      reset(getEmptyFormValues());
      showSnackbar('Draft saved successfully', 'success');
    } catch {
      showSnackbar('Failed to save draft', 'error');
    }
  }, [dispatch, reset, showSnackbar, watch]);

  const handleClearAll = useCallback(() => {
    dispatch(setCurrentFormState(null));
    reset(getEmptyFormValues());
  }, [dispatch, reset]);

  // Keyboard shortcuts — refs avoid stale closures without extra effect re-runs
  const handleCreateRef = useRef(handleCreateServiceLog);
  const handleSaveDraftRef = useRef(handleSaveDraft);

  useEffect(() => {
    handleCreateRef.current = handleCreateServiceLog;
    handleSaveDraftRef.current = handleSaveDraft;
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCreateRef.current();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraftRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return {
    handleCreateServiceLog,
    handleSaveDraft,
    handleClearAll,
    autoSaveStatus,
  };
};
