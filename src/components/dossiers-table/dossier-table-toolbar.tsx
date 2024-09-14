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
import { DatePicker } from '@mui/x-date-pickers';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

// Local Components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IDossierTableFilterValue, IDossierTableFilters } from 'src/types/dossier';

/* -------------------------------------------------------------------------- */
/*                           DOSSIER TABLE TOOLBAR                            */
/* -------------------------------------------------------------------------- */
type Props = {
  filters: IDossierTableFilters,
  onFilters: (name: string, value: IDossierTableFilterValue) => void,
  dateError: boolean;
  //serviceOptions: string[];
};

function DossierTableToolbar({
  filters,
  onFilters,
  dateError,
  //serviceOptions
}: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  /*const handleFilterService = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'service',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );*/

  const handleFilterEmissiontDate = useCallback(
    (newValue: Date | null) => {
      onFilters('dateEmission', newValue);
    },
    [onFilters]
  );

  const handleFilterContractDate = useCallback(
    (newValue: Date | null) => {
      onFilters('dateContrat', newValue);
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
        {/*<FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 180 },
          }}
        >
          <InputLabel> Service </InputLabel>

          <Select
            multiple
            value={filters.service}
            onChange={handleFilterService}
            input={<OutlinedInput label="Service" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            sx={{ textTransform: 'capitalize' }}
          >
            {serviceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.service.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>*/}

        <DatePicker
          label="Date D'Emission"
          value={filters.dateEmission}
          onChange={handleFilterEmissiontDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 200 },
          }}
        />

        <DatePicker
          label="Date De Contrat"
          value={filters.dateContrat}
          onChange={handleFilterContractDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError && "Date De Déposition doit etre supérieur au Date D'Emission",
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
            value={filters.name}
            onChange={handleFilterName}
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
          Print
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

export default DossierTableToolbar;