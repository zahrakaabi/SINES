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

// UI Local Components
import Iconify from 'src/components/iconify';
import { IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

/* -------------------------------------------------------------------------- */
/*                          USER TABLE FILTERS RESULT                         */
/* -------------------------------------------------------------------------- */
type Props = StackProps & {
  filters: IUserTableFilters;
  onFilters: (créateur: string, value: IUserTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

function UserTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
/* -------------------------- HANDLE REMOVE KEYWORD ------------------------- */
  const handleRemoveKeyword = useCallback(() => {
    onFilters('créateur', '');
  }, [onFilters]);

/* -------------------------- HANDLE REMOCE STATUS -------------------------- */
  const handleRemoveStatus = useCallback(() => {
    onFilters('status', 'all');
  }, [onFilters]);

/* -------------------------------- CONSTANTS ------------------------------- */
  const {status, name} = filters;

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
        {status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={status} onDelete={handleRemoveStatus} />
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
}

export default UserTableFiltersResult;

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