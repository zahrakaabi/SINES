/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Pckages
import { forwardRef } from 'react';

// MUI
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// Local Components
import { RouterLink } from 'src/routes/components';

/* -------------------------------------------------------------------------- */
/*                               LOGO COMPONENT                               */
/* -------------------------------------------------------------------------- */
export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
/* ---------------------------------- HOOKS --------------------------------- */
    const theme = useTheme();

/* -------------------------------- CONSTANTS ------------------------------- */
    const logo = (
      <Box
        component="img"
        src="/logo/logo_single.png"
        sx={{ width: 100, height: 50, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;