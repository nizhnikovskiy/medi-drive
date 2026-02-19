import { useCallback } from 'react';
import {
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Button,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore,
  DirectionsCar,
  Build,
  DeleteSweep,
  Save,
  CheckCircle,
  Delete,
  Close,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceLogFormValues } from '@/types/serviceLog.ts';
import { serviceLogSchema } from '@/validation/serviceLogSchema.ts';
import { FormTextField } from '@/components/form/FormTextField.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { FormDatePicker } from '@/components/form/FormDatePicker.tsx';
import { SERVICE_TYPE_OPTIONS } from '@/constants';
import { useDateSync } from '../hooks/useDateSync';
import { DraftStatusIndicator } from './DraftStatusIndicator';
import { getEmptyFormValues } from '../constants';
import { useServiceLogFormActions } from '../hooks/useServiceLogFormActions';
import { useAutoSave } from '../hooks/useAutoSave';

interface CreateModeProps {
  mode?: 'create';
  initialValues?: ServiceLogFormValues;
  onAutoSave?: undefined;
  onSubmit?: undefined;
  onDelete?: undefined;
  onClose?: undefined;
}

interface EditDraftModeProps {
  mode: 'editDraft';
  initialValues: ServiceLogFormValues;
  onAutoSave: (data: ServiceLogFormValues) => void;
  onSubmit: (data: ServiceLogFormValues) => void;
  onDelete: () => void;
  onClose: () => void;
}

interface EditLogModeProps {
  mode: 'editLog';
  initialValues: ServiceLogFormValues;
  onAutoSave?: undefined;
  onSubmit: (data: ServiceLogFormValues) => void;
  onDelete: () => void;
  onClose: () => void;
}

export type ServiceLogFormProps = CreateModeProps | EditDraftModeProps | EditLogModeProps;

export const ServiceLogForm = (props: ServiceLogFormProps) => {
  const {
    initialValues,
    mode = 'create',
    onAutoSave,
    onSubmit: onSubmitProp,
    onDelete,
    onClose,
  } = props;

  const isCreate = mode === 'create';

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<ServiceLogFormValues>({
    resolver: yupResolver(serviceLogSchema) as any,
    defaultValues: initialValues ?? getEmptyFormValues(),
    mode: 'onChange',
  });

  useDateSync({ watch, setValue });

  const {
    handleCreateServiceLog,
    handleSaveDraft,
    handleClearAll,
    autoSaveStatus: createAutoSaveStatus,
  } = useServiceLogFormActions({ handleSubmit, reset, watch, enabled: isCreate });

  const { autoSaveStatus: editAutoSaveStatus } = useAutoSave({
    watch,
    onAutoSave: !isCreate ? onAutoSave : undefined,
  });

  const autoSaveStatus = isCreate ? createAutoSaveStatus : editAutoSaveStatus;
  const showAutoSaveIndicator = mode !== 'editLog';

  const handleEditSubmit = useCallback(() => {
    if (onSubmitProp) {
      handleSubmit(onSubmitProp)();
    }
  }, [handleSubmit, onSubmitProp]);

  const formFields = (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        alignItems: 'start',
      }}
    >
      <Accordion
        defaultExpanded
        sx={{
          alignSelf: 'start',
          '&.Mui-expanded': { margin: 0 },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsCar />
            <Typography variant="h6">Vehicle Information</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormTextField
              name="providerId"
              control={control}
              label="Provider ID"
            />
            <FormTextField
              name="carId"
              control={control}
              label="Car ID"
            />
            <FormTextField
              name="odometer"
              control={control}
              label="Odometer"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">mi</InputAdornment>,
              }}
            />
            <FormTextField
              name="engineHours"
              control={control}
              label="Engine Hours"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">hrs</InputAdornment>,
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{
          alignSelf: 'start',
          '&.Mui-expanded': { margin: 0 },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Build />
            <Typography variant="h6">Service Details</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormTextField
              name="serviceOrder"
              control={control}
              label="Service Order"
            />
            <FormSelect
              name="type"
              control={control}
              label="Service Type"
              options={SERVICE_TYPE_OPTIONS}
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <FormDatePicker
                name="startDate"
                control={control}
                label="Start Date"
              />
              <FormDatePicker
                name="endDate"
                control={control}
                label="End Date"
              />
            </Box>
            <FormTextField
              name="serviceDescription"
              control={control}
              label="Service Description"
              multiline
              rows={4}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  const content = (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        {showAutoSaveIndicator && (
          <DraftStatusIndicator
            isSaving={autoSaveStatus === 'saving'}
            isSaved={autoSaveStatus === 'saved'}
          />
        )}
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
          {mode === 'create' && (
            <>
              <Tooltip title="Clear all fields (Ctrl+Shift+C)" arrow>
                <Button
                  startIcon={<DeleteSweep />}
                  onClick={handleClearAll}
                  variant="outlined"
                  color="warning"
                >
                  Clear Form
                </Button>
              </Tooltip>
              <Tooltip title="Save as draft (Ctrl+S)" arrow>
                <Button
                  startIcon={<Save />}
                  onClick={handleSaveDraft}
                  variant="outlined"
                  color="primary"
                >
                  Save as Draft
                </Button>
              </Tooltip>
              <Tooltip title="Create service log (Ctrl+Enter)" arrow>
                <Button
                  startIcon={<CheckCircle />}
                  onClick={handleCreateServiceLog}
                  variant="contained"
                  color="primary"
                >
                  Create Service Log
                </Button>
              </Tooltip>
            </>
          )}

          {mode === 'editDraft' && (
            <>
              <Button
                startIcon={<Delete />}
                onClick={onDelete}
                variant="outlined"
                color="error"
              >
                Delete Draft
              </Button>
              <Button
                startIcon={<CheckCircle />}
                onClick={handleEditSubmit}
                variant="contained"
                color="primary"
              >
                Submit as Service Log
              </Button>
            </>
          )}

          {mode === 'editLog' && (
            <>
              <Button
                startIcon={<Close />}
                onClick={onClose}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                startIcon={<Delete />}
                onClick={onDelete}
                variant="outlined"
                color="error"
              >
                Delete Service Log
              </Button>
              <Button
                startIcon={<Save />}
                onClick={handleEditSubmit}
                variant="contained"
                color="primary"
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Box>

      {formFields}
    </Stack>
  );

  if (isCreate) {
    return <Paper sx={{ p: 3 }}>{content}</Paper>;
  }

  return content;
};
