import React from 'react';
import Box from '@material-ui/core/Box';
import UpcomingDatesListItem from '../UpcomingDateListItem';
import List from '../List';

interface UpcomingDatesListProps {
  upcomingDates: Array<{
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
    };
  }>;
}

const UpcomingDatesList = ({ upcomingDates }: UpcomingDatesListProps) => {
  return (
    <Box py={1}>
      <List label="Upcoming Dates" creatable={false}>
        {upcomingDates.map((tourLocation) => {
          return <UpcomingDatesListItem key={tourLocation.id} {...tourLocation} />;
        })}
      </List>
    </Box>
  );
};

export default UpcomingDatesList;
