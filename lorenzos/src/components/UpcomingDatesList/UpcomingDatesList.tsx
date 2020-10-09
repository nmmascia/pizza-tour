import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import UpcomingDatesListItem from '../UpcomingDateListItem';
import Divider from '@material-ui/core/Divider';

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
      <Box py={1} display="flex" alignItems="center" justifyContent="center" width="100%">
        <Typography variant="h5">Upcoming Dates</Typography>
      </Box>
      <Divider />
      <List>
        {upcomingDates.map((tourLocation) => {
          return <UpcomingDatesListItem key={tourLocation.id} {...tourLocation} />;
        })}
      </List>
    </Box>
  );
};

export default UpcomingDatesList;
