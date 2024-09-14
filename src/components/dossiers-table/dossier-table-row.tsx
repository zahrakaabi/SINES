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
import { Avatar, Checkbox } from '@mui/material';

// UI Local Components
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { fDate } from 'src/utils/format-time';
import { IDossierItem } from 'src/types/dossier';

/* -------------------------------------------------------------------------- */
/*                             DOSSIER TABLE ROW                              */
/* -------------------------------------------------------------------------- */
type Props = {
  row: IDossierItem,
  selected: boolean,
  onSelectRow: VoidFunction,
  onViewRow: VoidFunction,
  onEditRow: VoidFunction,
  onDeleteRow: VoidFunction
};

function DossierTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow
}: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { 
    id,
    NOM,
    PRENOM,
    lot,
    CIN,
    TEL,
    VILLE,
    DATEEMISSION,
    ADRINSTALLATION,
    POSTALCODE,
    DATECONTRAT,
    NUMSERIECAPTEUR1,
    NUMSERIECAPTEUR2,
    BALLON
  } = row;

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

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={`${NOM} ${PRENOM}`} sx={{ mr: 2 }}>
            {NOM.charAt(0).toUpperCase()}
            {PRENOM.charAt(0).toUpperCase()}
          </Avatar>
          {`${NOM} ${PRENOM}`}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {lot ? lot.NUMLOT : '_'} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {id} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {CIN} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {fDate(DATEEMISSION)} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {fDate(DATECONTRAT)} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {TEL} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {VILLE} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {NUMSERIECAPTEUR1} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {NUMSERIECAPTEUR2} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {BALLON} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {ADRINSTALLATION} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {POSTALCODE} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}> _ </TableCell>
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

      {/*<LotQuickAddEditForm 
        currentLot={row} 
        defaultLot={defaultLot}
        open={quickEdit.value} 
        onClose={quickEdit.onFalse} 
      />*/}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

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
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
};

export default DossierTableRow;