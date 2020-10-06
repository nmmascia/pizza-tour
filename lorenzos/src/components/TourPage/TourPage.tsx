import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Routes, Route, useParams } from 'react-router-dom';
import TourLocationPage from '../TourLocationPage';
import { useQuery } from 'urql';
import Skeleton from '@material-ui/lab/Skeleton';

const TourPage = () => {
  const { tourId } = useParams();
  const [{ data, fetching }] = useQuery({
    query: `
      query($tourId: Int!) {
        tour(id: $tourId) {
          id
          name
          tourLocations {
            id
            date
            location {
              id
              name
            }
          }
        }
      }
    `,
    variables: {
      tourId: parseInt(tourId, 10),
    },
  });

  return (
    <Box height="100%" width="100%">
      <Box py={1}>
        {fetching ? (
          <Skeleton variant="text" height={35} width={150} />
        ) : (
          <Typography variant="h5" component="h1">
            {data?.tour?.name}
          </Typography>
        )}
      </Box>
      <Routes>
        <Route path="tour-location/:tourLocationId" element={<TourLocationPage fetching={fetching} />} />
        <Route element={<div> UPCOMING EVENTS</div>} />
      </Routes>
    </Box>
  );
};

export default memo(TourPage);
