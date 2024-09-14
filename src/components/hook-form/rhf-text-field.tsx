/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packes
import { Controller, useFormContext } from 'react-hook-form';

// MUI
import TextField, { TextFieldProps } from '@mui/material/TextField';

/* -------------------------------------------------------------------------- */
/*                               RHF TEXT FIELD                               */
/* -------------------------------------------------------------------------- */
type Props = TextFieldProps & {
  name: string;
};

function RHFTextField({ name, helperText, type, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;