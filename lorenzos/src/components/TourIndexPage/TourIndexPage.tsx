import React from 'react';
import UpcomingDatesList from '../UpcomingDatesList';
import Box from '@material-ui/core/Box';
import PastDatesList from '../PastDatesList';
import Typography from '@material-ui/core/Typography';
import partition from 'lodash/partition';
import parseISO from 'date-fns/parseISO';
import isFuture from 'date-fns/isFuture';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from 'urql';
import CircularProgress from '@material-ui/core/CircularProgress';

const TourIndexPage = () => {
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

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (data?.tour === null) {
    return <Navigate to="/not-found" replace={true} />;
  }

  const [upcomingDates, pastDates] = partition(data?.tour?.tourLocations, ({ date }) => {
    return isFuture(parseISO(date));
  });

  return (
    <>
      <Box py={1}>
        <Typography align="center" color="primary" variant="body1" component="h1" style={{ fontWeight: 'bold' }}>
          {data?.tour?.name}
        </Typography>
      </Box>
      <Box>
        <UpcomingDatesList upcomingDates={upcomingDates} />
        <PastDatesList pastDates={pastDates} />
      </Box>
    </>
  );
};

export default TourIndexPage;
