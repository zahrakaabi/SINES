/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

// MUI 
import Box, { BoxProps } from '@mui/material/Box';

// Local Components
import { IconifyProps } from './types';

/* -------------------------------------------------------------------------- */
/*                                 FORWARD REF                                */
/* -------------------------------------------------------------------------- */
interface Props extends BoxProps {
  icon: IconifyProps;
};

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;