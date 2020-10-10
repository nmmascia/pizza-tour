import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import TourLocationPage from '../TourLocationPage';
import { useQuery } from 'urql';
import Skeleton from '@material-ui/lab/Skeleton';
import TourIndexPage from '../TourIndexPage';
import partition from 'lodash/partition';
import parseISO from 'date-fns/parseISO';
import isFuture from 'date-fns/isFuture';

const TourPage = () => {
  const navigate = useNavigate();
  const { tourId } = useParams();
  const [{ data, fetching }] = useQuery({
    query: `
      query($tourId: Int!) {
        tour(id: $tourId) {
          id
          name
          users {
            id
            name
            username
          }
          tourLocations {
            id
            date
            location {
              id
              name
            }
            foodRatings {
              id
              user {
                id
                username
              }
              score
              overview
              food {
                id
                name
              }
            }
          }
        }
      }
    `,
    variables: {
      tourId: parseInt(tourId, 10),
    },
  });

  if (data?.tour === null) {
    navigate('/not-found', { replace: true });
  }

  const [upcomingDates, pastDates] = partition(data?.tour?.tourLocations, ({ date }) => {
    return isFuture(parseISO(date));
  });

  return (
    <Box pt={1} height="100%" width="100%">
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
        <Route element={<TourIndexPage upcomingDates={upcomingDates} pastDates={pastDates} />} />
      </Routes>
    </Box>
  );
};

export default memo(TourPage);
