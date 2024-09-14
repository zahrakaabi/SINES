/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from 'react-hook-form';

// MUI
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

/* -------------------------------------------------------------------------- */
/*                                  INETRFACE                                 */
/* -------------------------------------------------------------------------- */
interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                 RHF SWITCH                                 */
/* -------------------------------------------------------------------------- */
function RHFSwitch({ name, helperText, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default RHFSwitch;