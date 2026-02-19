import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date: Dayjs | null) => {
            field.onChange(date ? date.format('YYYY-MM-DD') : '');
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message || ' ',
            },
          }}
        />
      )}
    />
  );
};
