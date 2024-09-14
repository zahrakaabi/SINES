/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

/* -------------------------------------------------------------------------- */
/*                              TABLE EMPTY ROWS                              */
/* -------------------------------------------------------------------------- */
type Props = {
  height?: number;
  emptyRows: number;
};

function TableEmptyRows({ emptyRows, height }: Props) {
  if (!emptyRows) {
    return null;
  }

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
};

export default TableEmptyRows;