import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateServiceLog,
  deleteServiceLog,
  serviceLogsSelectors,
} from '@/features/serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog';
import { useSnackbar } from '@/components/feedback/SnackbarProvider';
import { FormDialog } from '@/components/feedback/FormDialog';
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { ServiceLogForm } from '@/features/drafts/components/ServiceLogForm';
import { toFormValues } from '@/utils/serviceLog';

interface ServiceLogEditDialogProps {
  logId: string;
  onClose: () => void;
}

export const ServiceLogEditDialog = ({ logId, onClose }: ServiceLogEditDialogProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const log = useAppSelector((state) =>
    serviceLogsSelectors.selectById(state, logId)
  );

  const handleSave = useCallback(
    (data: ServiceLogFormValues) => {
      try {
        dispatch(updateServiceLog({ id: logId, changes: data }));
        showSnackbar('Service log updated', 'success');
        onClose();
      } catch {
        showSnackbar('Failed to update service log', 'error');
      }
    },
    [dispatch, logId, showSnackbar, onClose]
  );

  const handleDelete = useCallback(() => {
    try {
      dispatch(deleteServiceLog(logId));
      showSnackbar('Service log deleted', 'info');
      onClose();
    } catch {
      showSnackbar('Failed to delete service log', 'error');
    }
  }, [dispatch, logId, showSnackbar, onClose]);

  if (!log) return null;

  return (
    <>
      <FormDialog title="Edit Service Log" onClose={onClose}>
        <ServiceLogForm
          key={logId}
          initialValues={toFormValues(log)}
          mode="editLog"
          onSubmit={handleSave}
          onDelete={() => setConfirmOpen(true)}
          onClose={onClose}
        />
      </FormDialog>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Service Log"
        message="Are you sure you want to delete this service log? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
