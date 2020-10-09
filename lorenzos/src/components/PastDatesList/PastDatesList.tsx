import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PastDatesListItem from '../PastDatesListItem';

interface PastDatesListProps {
  pastDates: Array<{
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
    };
  }>;
}

const PastDatesList = ({ pastDates }: PastDatesListProps) => {
  return (
    <Box py={1}>
      <Box py={1} display="flex" alignItems="center" justifyContent="center" width="100%">
        <Typography variant="h5">Past Dates</Typography>
      </Box>
      <Divider />
      <List>
        {pastDates.map((tourLocation) => {
          return <PastDatesListItem key={tourLocation.id} {...tourLocation} />;
        })}
      </List>
    </Box>
  );
};

export default PastDatesList;
