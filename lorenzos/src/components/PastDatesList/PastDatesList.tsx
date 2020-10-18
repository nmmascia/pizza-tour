import React from 'react';
import Box from '@material-ui/core/Box';
import List from '../List';
import PastDatesListItem from '../PastDatesListItem';

interface PastDatesListProps {
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

const PastDatesList = ({ pastDates }: PastDatesListProps) => {
  return (
    <Box py={1}>
      <List label="Past Dates" creatable={false}>
        {pastDates.map((tourLocation) => {
          return <PastDatesListItem key={tourLocation.id} {...tourLocation} />;
        })}
      </List>
    </Box>
  );
};

export default PastDatesList;
