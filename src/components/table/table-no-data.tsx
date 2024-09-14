/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Theme, SxProps } from '@mui/material/styles';

// UI Local Components
import EmptyContent from '../empty-content';

/* -------------------------------------------------------------------------- */
/*                                TABLE NO DATA                               */
/* -------------------------------------------------------------------------- */
type Props = {
  notFound: boolean;
  sx?: SxProps<Theme>;
};

function TableNoData({ notFound, sx }: Props) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
};

export default TableNoData;