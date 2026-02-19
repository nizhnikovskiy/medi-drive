import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateServiceLog,
  deleteServiceLog,
  promoteDraftToLog,
  serviceLogsSelectors,
} from '@/features/serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog';
import { useSnackbar } from '@/components/feedback/SnackbarProvider';
import { FormDialog } from '@/components/feedback/FormDialog';
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { ServiceLogForm } from './ServiceLogForm';
import { toFormValues } from '@/utils/serviceLog';

interface DraftEditDialogProps {
  draftId: string;
  onClose: () => void;
}

export const DraftEditDialog = ({ draftId, onClose }: DraftEditDialogProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const draft = useAppSelector((state) =>
    serviceLogsSelectors.selectById(state, draftId)
  );

  const handleAutoSave = useCallback(
    (data: ServiceLogFormValues) => {
      try {
        dispatch(updateServiceLog({ id: draftId, changes: data }));
      } catch {
        showSnackbar('Failed to auto-save draft', 'error');
      }
    },
    [dispatch, draftId, showSnackbar]
  );

  const handleSubmit = useCallback(
    (data: ServiceLogFormValues) => {
      try {
        dispatch(updateServiceLog({ id: draftId, changes: data }));
        dispatch(promoteDraftToLog(draftId));
        showSnackbar('Draft submitted as service log', 'success');
        onClose();
      } catch {
        showSnackbar('Failed to submit draft', 'error');
      }
    },
    [dispatch, draftId, showSnackbar, onClose]
  );

  const handleDelete = useCallback(() => {
    try {
      dispatch(deleteServiceLog(draftId));
      showSnackbar('Draft deleted', 'info');
      onClose();
    } catch {
      showSnackbar('Failed to delete draft', 'error');
    }
  }, [dispatch, draftId, showSnackbar, onClose]);

  if (!draft) return null;

  return (
    <>
      <FormDialog title="Edit Draft" onClose={onClose}>
        <ServiceLogForm
          key={draftId}
          initialValues={toFormValues(draft)}
          mode="editDraft"
          onAutoSave={handleAutoSave}
          onSubmit={handleSubmit}
          onDelete={() => setConfirmOpen(true)}
          onClose={onClose}
        />
      </FormDialog>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Draft"
        message="Are you sure you want to delete this draft? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
