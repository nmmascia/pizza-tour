import React, { memo, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormattedDate from '../FormattedDate';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

interface PastDatesListItemProps {
  date: string;
  location: {
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
}

const PastDatesListItem = ({ date, location: { name }, foodRatings }: PastDatesListItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
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
      <Collapse in={open}>
        <Box px={2}>
          <List>
            {foodRatings.map((fr) => {
              return (
                <ListItem dense={true} key={fr.id}>
                  <ListItemAvatar>
                    <Avatar
                      style={{ height: 25, width: 25 }}
                      src="https://cdn.vox-cdn.com/thumbor/yZVpqUtmjd-8KWtxb5pXz5Y8RKc=/85x0:1013x619/1200x800/filters:focal(85x0:1013x619)/cdn.vox-cdn.com/uploads/chorus_image/image/47771399/tmnt.0.0.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{fr.food.name}</Typography>
                      <Typography>{fr.score || '--'}</Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Collapse>
    </>
  );
};

export default memo(PastDatesListItem);
