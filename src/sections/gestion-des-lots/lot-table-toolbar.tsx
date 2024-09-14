/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback } from 'react';

// MUI
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material';

// Local Components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ILotTableFilterValue, ILotTableFilters } from 'src/types/lot';

/* -------------------------------------------------------------------------- */
/*                              LOT TABLE TOOLBAR                             */
/* -------------------------------------------------------------------------- */
type Props = {
  filters: ILotTableFilters,
  onFilters: (createur: string, value: ILotTableFilterValue) => void,
  dateError?: boolean
};

function LotTableToolbar({
  filters,
  onFilters,
  dateError
}: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const popover = usePopover();

  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('createur', event.target.value);
    },
    [onFilters]
  );

  const handleFilterCreationtDate = useCallback(
    (newValue: Date | null) => {
      onFilters('DATECREATION', newValue);
    },
    [onFilters]
  );

  const handleFilterDepositionDate = useCallback(
    (newValue: Date | null) => {
      onFilters('DATEDEPOSITION', newValue);
    },
    [onFilters]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        
        <DatePicker
          label="Date de Création"
          value={filters.creationDate}
          onChange={handleFilterCreationtDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 200 },
          }}
        />

        <DatePicker
          label="Date de Déposition"
          value={filters.depositionDate}
          onChange={handleFilterDepositionDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError && 'Date de Déposition doit etre Supérieur au Date de Création',
            },
          }}
          sx={{
            maxWidth: { md: 200 },
            [`& .${formHelperTextClasses.root}`]: {
              position: { md: 'absolute' },
              bottom: { md: -40 },
            },
          }}
        />

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.créateur}
            onChange={handleFilter}
            placeholder="Recherche..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Imprimer
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Importer
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Exporter
        </MenuItem>
      </CustomPopover>
    </>
  );
};

export default LotTableToolbar;