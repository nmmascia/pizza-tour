import React from 'react';
import UpcomingDatesList from '../UpcomingDatesList';
import Box from '@material-ui/core/Box';
import PastDatesList from '../PastDatesList';

interface TourIndexPageProps {
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

const TourIndexPage = ({ upcomingDates, pastDates }: TourIndexPageProps) => {
  return (
    <Box>
      <UpcomingDatesList upcomingDates={upcomingDates} />
      <PastDatesList pastDates={pastDates} />
    </Box>
  );
};

export default TourIndexPage;
