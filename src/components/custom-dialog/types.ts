/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import { DialogProps } from '@mui/material/Dialog';

/* -------------------------------------------------------------------------- */
/*                            CONFIRM DIALOG PROPS                            */
/* -------------------------------------------------------------------------- */
export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};
