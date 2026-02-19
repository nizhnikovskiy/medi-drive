import { useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateServiceLog,
  deleteServiceLog,
  promoteDraftToLog,
  serviceLogsSelectors,
} from '@/features/serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog';
import { useSnackbar } from '@/components/feedback/SnackbarProvider';
import { ServiceLogForm } from './ServiceLogForm';

interface DraftEditDialogProps {
  draftId: string;
  onClose: () => void;
}

export const DraftEditDialog = ({ draftId, onClose }: DraftEditDialogProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const draft = useAppSelector((state) =>
    serviceLogsSelectors.selectById(state, draftId)
  );

  const handleAutoSave = useCallback(
    (data: ServiceLogFormValues) => {
      dispatch(updateServiceLog({ id: draftId, changes: data }));
    },
    [dispatch, draftId]
  );

  const handleSubmit = useCallback(
    (data: ServiceLogFormValues) => {
      dispatch(updateServiceLog({ id: draftId, changes: data }));
      dispatch(promoteDraftToLog(draftId));
      showSnackbar('Draft submitted as service log', 'success');
      onClose();
    },
    [dispatch, draftId, showSnackbar, onClose]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteServiceLog(draftId));
    showSnackbar('Draft deleted', 'info');
    onClose();
  }, [dispatch, draftId, showSnackbar, onClose]);

  if (!draft) return null;

  const initialValues: ServiceLogFormValues = {
    providerId: draft.providerId,
    serviceOrder: draft.serviceOrder,
    carId: draft.carId,
    odometer: draft.odometer,
    engineHours: draft.engineHours,
    startDate: draft.startDate,
    endDate: draft.endDate,
    type: draft.type,
    serviceDescription: draft.serviceDescription,
  };

  return (
    <Dialog open fullWidth maxWidth="lg" onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Typography variant="h6" component="span">
          Edit Draft
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <ServiceLogForm
          key={draftId}
          initialValues={initialValues}
          mode="editDraft"
          onAutoSave={handleAutoSave}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
