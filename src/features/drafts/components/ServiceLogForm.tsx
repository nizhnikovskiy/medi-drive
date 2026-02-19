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
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceLogFormValues, ServiceType } from '@/types/serviceLog.ts';
import { serviceLogSchema } from '@/validation/serviceLogSchema.ts';
import { FormTextField } from '@/components/form/FormTextField.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { FormDatePicker } from '@/components/form/FormDatePicker.tsx';
import { useDateSync } from '../hooks/useDateSync';
import { SplitButton } from '@/components/form/SplitButton.tsx';
import { getEmptyFormValues } from '../constants';
import { useServiceLogFormActions } from '../hooks/useServiceLogFormActions';

const serviceTypeOptions = [
  { value: ServiceType.Planned, label: 'Planned' },
  { value: ServiceType.Unplanned, label: 'Unplanned' },
  { value: ServiceType.Emergency, label: 'Emergency' },
];

export const ServiceLogForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<ServiceLogFormValues>({
    resolver: yupResolver(serviceLogSchema) as any,
    defaultValues: getEmptyFormValues(),
    mode: 'onChange',
  });

  useDateSync({ watch, setValue });

  const { handleCreateServiceLog, handleSaveDraft, handleClearAll } = useServiceLogFormActions({
    handleSubmit,
    reset,
    watch,
  });

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Tooltip title="Clear all fields" arrow>
              <Button
                startIcon={<DeleteSweep />}
                onClick={handleClearAll}
                variant="outlined"
                color="warning"
              >
                Clear All
              </Button>
            </Tooltip>
            <SplitButton
              onCreateServiceLog={handleCreateServiceLog}
              onSaveDraft={handleSaveDraft}
            />
          </Box>

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
                '&.Mui-expanded': {
                  margin: 0,
                },
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
                '&.Mui-expanded': {
                  margin: 0,
                },
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
                    options={serviceTypeOptions}
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
        </Stack>
      </Paper>
    </Box>
  );
};
