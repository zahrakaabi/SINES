/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Checkbox } from '@mui/material';

// UI Local Components
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ILotItem } from 'src/types/lot';
import Label from 'src/components/label';
import { fDate } from 'src/utils/format-time';
import LotQuickAddEditForm from './lot-quick-add-edit-form';

/* -------------------------------------------------------------------------- */
/*                                LOT TABLE ROW                               */
/* -------------------------------------------------------------------------- */
type Props = {
  selected: boolean;
  onSelectRow: VoidFunction;
  onEditRow: VoidFunction;
  key: number,
  row: ILotItem;
  defaultLot: ILotItem;
  setTableData: any,
  onDeleteRow: VoidFunction;
};

function LotTableRow({
  row,
  defaultLot,
  setTableData,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { 
    NUMLOT,
    NUMANME,
    LOTSTEG,
    DATECREATION,
    //createur : {username},
    DATEDEPOSITION,
    REJET } = row;

/* ---------------------------------- HOOKS --------------------------------- */
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{NUMLOT}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{NUMANME}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{!LOTSTEG ? '_' : <Label
            variant="soft"
            color={'success'}
          >
            STEG
          </Label>}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{DATECREATION === null ? 'mm/jj/aaaa' : fDate(DATECREATION)}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}> admin {/* username */} </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{DATEDEPOSITION === null ? 'mm/jj/aaaa' : fDate(DATEDEPOSITION)}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{!REJET ? '_' : <Label
            variant="soft"
            color={'error'}
          >
            Rejet
          </Label>}
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Modification rapide" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <LotQuickAddEditForm 
        currentLot={row} 
        defaultLot={defaultLot} 
        open={quickEdit.value} 
        onClose={quickEdit.onFalse}
        setTableData={setTableData}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Modifier
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Supprimer
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Etes-vous sure de supprimer?"
        action={
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => {
              confirm.onFalse();
              onDeleteRow();
            }}
          >
            Supprimer
          </Button>
        }
      />
    </>
  );
};

export default LotTableRow;