import { useEffect, useRef, useCallback } from 'react';
import { UseFormHandleSubmit, UseFormReset, UseFormWatch } from 'react-hook-form';
import { useAppDispatch } from '@/app/hooks.ts';
import { addServiceLog, addDraft } from '../../serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog.ts';
import { useSnackbar } from '@/components/feedback/SnackbarProvider.tsx';
import { getEmptyFormValues } from '../constants';

interface UseServiceLogFormActionsProps {
  handleSubmit: UseFormHandleSubmit<ServiceLogFormValues>;
  reset: UseFormReset<ServiceLogFormValues>;
  watch: UseFormWatch<ServiceLogFormValues>;
}

export const useServiceLogFormActions = ({
  handleSubmit,
  reset,
  watch,
}: UseServiceLogFormActionsProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    (data: ServiceLogFormValues) => {
      dispatch(addServiceLog(data));
      reset(getEmptyFormValues());
      showSnackbar('Service log created successfully', 'success');
    },
    [dispatch, reset, showSnackbar]
  );

  const handleCreateServiceLog = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const handleSaveDraft = useCallback(() => {
    const formData = watch();
    
    // Check if all fields (except those with default values) are empty
    const hasContent = 
      formData.providerId.trim() !== '' ||
      formData.serviceOrder.trim() !== '' ||
      formData.carId.trim() !== '' ||
      formData.odometer !== '' ||
      formData.engineHours !== '' ||
      formData.serviceDescription.trim() !== '';
    
    if (!hasContent) {
      showSnackbar('Cannot save empty draft', 'warning');
      return;
    }
    
    dispatch(addDraft(formData as ServiceLogFormValues));
    reset(getEmptyFormValues());
    showSnackbar('Draft saved successfully', 'success');
  }, [dispatch, reset, showSnackbar, watch]);

  const handleClearAll = useCallback(() => {
    reset(getEmptyFormValues());
  }, [reset]);

  const handleCreateRef = useRef(handleCreateServiceLog);
  const handleSaveDraftRef = useRef(handleSaveDraft);

  useEffect(() => {
    handleCreateRef.current = handleCreateServiceLog;
    handleSaveDraftRef.current = handleSaveDraft;
  });

  useEffect(() => {
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
  }, []);

  return {
    handleCreateServiceLog,
    handleSaveDraft,
    handleClearAll,
  };
};
