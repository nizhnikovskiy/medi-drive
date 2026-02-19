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
  serviceLogsSelectors,
} from '@/features/serviceLogs/serviceLogsSlice';
import { ServiceLogFormValues } from '@/types/serviceLog';
import { useSnackbar } from '@/components/feedback/SnackbarProvider';
import { ServiceLogForm } from '@/features/drafts/components/ServiceLogForm';

interface ServiceLogEditDialogProps {
  logId: string;
  onClose: () => void;
}

export const ServiceLogEditDialog = ({ logId, onClose }: ServiceLogEditDialogProps) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const log = useAppSelector((state) =>
    serviceLogsSelectors.selectById(state, logId)
  );

  const handleSave = useCallback(
    (data: ServiceLogFormValues) => {
      dispatch(updateServiceLog({ id: logId, changes: data }));
      showSnackbar('Service log updated', 'success');
      onClose();
    },
    [dispatch, logId, showSnackbar, onClose]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteServiceLog(logId));
    showSnackbar('Service log deleted', 'info');
    onClose();
  }, [dispatch, logId, showSnackbar, onClose]);

  if (!log) return null;

  const initialValues: ServiceLogFormValues = {
    providerId: log.providerId,
    serviceOrder: log.serviceOrder,
    carId: log.carId,
    odometer: log.odometer,
    engineHours: log.engineHours,
    startDate: log.startDate,
    endDate: log.endDate,
    type: log.type,
    serviceDescription: log.serviceDescription,
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
          Edit Service Log
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <ServiceLogForm
          key={logId}
          initialValues={initialValues}
          mode="editLog"
          onSubmit={handleSave}
          onDelete={handleDelete}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
