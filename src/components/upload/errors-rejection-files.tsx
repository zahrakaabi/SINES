/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { FileRejection } from 'react-dropzone';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// UI Local Components
import { fData } from 'src/utils/format-number';
import { fileData } from '../file-thumbnail';

/* -------------------------------------------------------------------------- */
/*                                REJECT FILES                                */
/* -------------------------------------------------------------------------- */
type Props = {
  fileRejections: FileRejection[];
};

function RejectionFiles({ fileRejections }: Props) {
  if (!fileRejections.length) {
    return null;
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'dashed',
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                - {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
};

export default RejectionFiles;