/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import { CircularProgress, alpha } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Local Components
import Iconify from 'src/components/iconify';

/* -------------------------------------------------------------------------- */
/*                                 LOT TITLES                                 */
/* -------------------------------------------------------------------------- */
type Props = {
  icon: string;
  percent: number;
  color?: string;
  title: string;
  total: number
};

function LotTitles({ icon, percent, color, title, total }: Props) {
/* -------------------------------- RENDRING -------------------------------- */
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={32} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={2}
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={3}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'gray', fontWeight: 400 }}>{total}</Typography>
      </Stack>
    </Stack>
  );
};

export default LotTitles;