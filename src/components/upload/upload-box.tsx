/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useDropzone } from 'react-dropzone';

// MUI
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

// UI Local Components
import Iconify from '../iconify';
import { UploadProps } from './types';

/* -------------------------------------------------------------------------- */
/*                                 UPLOAD BOX                                 */
/* -------------------------------------------------------------------------- */
function UploadBox({ placeholder, error, disabled, sx, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });
/* -------------------------------- CONSTANTS ------------------------------- */
  const hasError = isDragReject || error;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Box
      {...getRootProps()}
      sx={{
        m: 0.5,
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...(hasError && {
          color: 'error.main',
          borderColor: 'error.main',
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        }),
        '&:hover': {
          opacity: 0.72,
        },
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </Box>
  );
};

export default UploadBox;