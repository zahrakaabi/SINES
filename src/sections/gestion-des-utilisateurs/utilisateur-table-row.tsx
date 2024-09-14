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
import { IUserItem } from 'src/types/user';
import UserQuickAddEditForm from './utilisateur-quick-add-edit-form';

/* -------------------------------------------------------------------------- */
/*                               USER TABLE ROW                               */
/* -------------------------------------------------------------------------- */
type Props = {
  selected: boolean;
  tableData: IUserItem[],
  setTableData: any,
  onSelectRow: VoidFunction;
  onEditRow: VoidFunction;
  row: IUserItem;
  onDeleteRow: VoidFunction;
};

const defaultUserValues = {
  id: 0,
  username: '',
  nom: '',
  prenom: '',
  password: '',
  role: ''
};

function UserTableRow({
  row,
  tableData,
  setTableData,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { username, nom, prenom, role } = row;

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
          <Avatar alt={`${nom} ${prenom}`} sx={{ mr: 2 }}>
            {nom.charAt(0).toUpperCase()}
            {prenom.charAt(0).toUpperCase()}
          </Avatar>
          {`${nom} ${prenom}`}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}> {username} </TableCell>
        
        <TableCell sx={{ whiteSpace: 'nowrap' }}> {role} </TableCell>

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

      <UserQuickAddEditForm 
        currentUser={row}
        tableData={tableData}
        setTableData={setTableData}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        defaultUser={defaultUserValues}    
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Modifier
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

export default UserTableRow;