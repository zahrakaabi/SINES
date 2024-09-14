import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Theme, SxProps } from '@mui/material/styles';

import DownloadButton from './download-button';
import { fileData, fileThumb, fileFormat } from './utils';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  fileView?: boolean;
  onDownload?: VoidFunction;
  sx?: SxProps<Theme>;
  fileSx?: SxProps<Theme>;
};

export default function FileThumbnail({
  file,
  tooltip,
  fileView,
  onDownload,
  sx,
  fileSx,
}: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file) || {};

  const format = fileFormat(path || preview);
  console.log('preview', preview)
  console.log('path', path)
  console.log('file', fileData(file))

  const renderContent =
    format === 'pdf' && fileView  ? (
      <Box
        component="img"
        src={fileThumb('pdf')}
        sx={{
          width: 1,
          height: 1,
          flexShrink: 0,
          objectFit: 'cover',
          ...fileSx,
        }}
      />
    ) : (
      <Box
        component="img"
        src={fileThumb(format)}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          ...sx,
        }}
      />
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
