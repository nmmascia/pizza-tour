import React from 'react';
import UpcomingDatesList from '../UpcomingDatesList';
import Box from '@material-ui/core/Box';
import PastDatesList from '../PastDatesList';
import Typography from '@material-ui/core/Typography';

interface TourIndexPageProps {
  tour: {
    id: string;
    name: string;
  };
  upcomingDates: Array<{
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
    };
  }>;
  pastDates: Array<{
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
    };
    foodRatings: Array<{
      id: number;
      user: {
        id: number;
        username: string;
      };
      score?: number;
      overview?: string;
      food: {
        id: number;
        name: string;
      };
    }>;
  }>;
}

const TourIndexPage = ({ tour, upcomingDates, pastDates }: TourIndexPageProps) => {
  return (
    <>
      <Box py={1}>
        <Typography align="center" color="primary" variant="body1" component="h1" style={{ fontWeight: 'bold' }}>
          {tour?.name}
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
