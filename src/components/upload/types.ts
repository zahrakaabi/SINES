/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { DropzoneOptions, Accept } from 'react-dropzone';

// MUI
import { Theme, SxProps } from '@mui/material/styles';

/* -------------------------------------------------------------------------- */
/*                            CUSTOM FILE INTERFACE                           */
/* -------------------------------------------------------------------------- */
export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: string;
}

/* -------------------------------------------------------------------------- */
/*                           UPLOAD PROPS INTERFACE                           */
/* -------------------------------------------------------------------------- */
export interface UploadProps extends DropzoneOptions {
  accept?: Accept; // Ensure this matches the `Accept` type from `react-dropzone`
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: (CustomFile | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
};
