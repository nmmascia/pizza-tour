import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Outlet } from 'react-router-dom';

const TourPage = () => {
  return (
    <Box height="100%" width="100%">
      <Box py={1}>
        <Typography variant="h5" component="h1">
          Family Tour
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
};

export default memo(TourPage);
