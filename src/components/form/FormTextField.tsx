import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  inputProps?: TextFieldProps['inputProps'];
  InputProps?: TextFieldProps['InputProps'];
}

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  multiline = false,
  rows,
  type = 'text',
  inputProps,
  InputProps,
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message || ' '}
          fullWidth
          multiline={multiline}
          rows={rows}
          type={type}
          inputProps={inputProps}
          InputProps={InputProps}
          value={field.value ?? ''}
        />
      )}
    />
  );
};
