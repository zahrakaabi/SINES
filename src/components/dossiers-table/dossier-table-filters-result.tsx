/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback } from 'react';

// MUI
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';

import { IDossierTableFilters, IDossierTableFilterValue } from 'src/types/dossier';

/* -------------------------------------------------------------------------- */
/*                        DOSSIER TABLE FILTERS RESULT                        */
/* -------------------------------------------------------------------------- */
type Props = StackProps & {
  filters: IDossierTableFilters;
  onFilters: (name: any, value: IDossierTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

function DossierTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const {dateEmission, dateContrat, status, name} = filters;
  const shortLabel = shortDateLabel(filters.dateEmission, filters.dateContrat);

  const handleRemoveKeyword = useCallback(() => {
    onFilters('name', '');
  }, [onFilters]);

  const handleRemoveStatus = useCallback(() => {
    onFilters('status', 'all');
  }, [onFilters]);

  const handleRemoveDate = useCallback(() => {
    onFilters('dateEmission', null);
    onFilters('dateContrat', null);
  }, [onFilters]);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          Résultats trouvés
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {/*{!!filters.service.length && (
          <Block label="Service:">
            {filters.service.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveService(item)}
              />
            ))}
          </Block>
        )}*/}

        {status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={status} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {dateEmission && dateContrat && (
          <Block label="Date:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )}

        {!!name && (
          <Block label="Keyword:">
            <Chip label={name} size="small" onDelete={handleRemoveKeyword} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Effacer
        </Button>
      </Stack>
    </Stack>
  );
};

export default DossierTableFiltersResult;

/* -------------------------------------------------------------------------- */
/*                                    BLOCK                                   */
/* -------------------------------------------------------------------------- */
type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
};