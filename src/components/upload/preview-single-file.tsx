/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import Box from '@mui/material/Box';

// UI Local Components
import Image from '../image';

/* -------------------------------------------------------------------------- */
/*                             SINGLE FILE PREVIEW                            */
/* -------------------------------------------------------------------------- */
type Props = {
  imgUrl?: string;
};

function SingleFilePreview({ imgUrl = '' }: Props) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Image
        alt="file preview"
        src={imgUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

export default SingleFilePreview;