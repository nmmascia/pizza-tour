import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Routes, Route } from 'react-router-dom';
import TourLocationPage from '../TourLocationPage';
import TourIndexPage from '../TourIndexPage';

const TourPage = () => {
  return (
    <Box pt={1} height="100%" width="100%">
      <Routes>
        <Route path="tour-location/:tourLocationId" element={<TourLocationPage />} />
        <Route element={<TourIndexPage />} />
      </Routes>
    </Box>
  );
};

export default memo(TourPage);
