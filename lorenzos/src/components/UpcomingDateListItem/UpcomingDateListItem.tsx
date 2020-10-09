import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormattedDate from '../FormattedDate';

interface UpcomingDateListItemProps {
  date: string;
  location: {
    name: string;
  };
}

const UpcomingDateListItem = ({ date, location: { name } }: UpcomingDateListItemProps) => {
  return (
    <ListItem>
      <ListItemText>
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography color="primary" variant="h6" component="p">
              {name}
            </Typography>
            <Typography variant="caption">
              <FormattedDate date={date} />
            </Typography>
          </Box>
        </Box>
      </ListItemText>
    </ListItem>
  );
};

export default memo(UpcomingDateListItem);
