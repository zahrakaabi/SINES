/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller, useFormContext } from 'react-hook-form';

// MUI
import FormHelperText from '@mui/material/FormHelperText';

// UI Local Components
import { Upload, UploadBox, UploadProps, UploadAvatar } from '../upload';

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              RHF UPLOAD AVATAR                             */
/* -------------------------------------------------------------------------- */
export function RHFUploadAvatar({ name, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar error={!!error} file={field.value} {...other} />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                               RHF UPLOAD BOX                               */
/* -------------------------------------------------------------------------- */
export function RHFUploadBox({ name, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 RHF UPLOAD                                 */
/* -------------------------------------------------------------------------- */
export function RHFUpload({ name, multiple, helperText, ...other }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { control } = useFormContext();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'application/pdf': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'application/pdf': [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
};