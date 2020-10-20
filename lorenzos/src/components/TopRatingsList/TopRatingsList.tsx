import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '../List';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import sortBy from 'lodash/sortBy';

interface TopRatingsListProps {
  label?: string;
  foodRatings?: Array<{
    id: number;
    user: {
      id: number;
      username: string;
    };
    score: number;
    food: {
      id: number;
      name: string;
    };
  }>;
}

const DEFAULT_FOOD_RATINGS: Array<{
  id: number;
  user: {
    id: number;
    username: string;
  };
  score: number;
  food: {
    id: number;
    name: string;
  };
}> = [];

const getHtmlColorForTrophy = (index: number) => {
  switch (index) {
    case 2:
      return '#9e865b';
    case 1:
      return '#9b9b9b';
    case 0:
      return '#d4af37';
    default:
      return undefined;
  }
};

const TopRatingsList = (props: TopRatingsListProps) => {
  const { label = 'Top Ratings', foodRatings = DEFAULT_FOOD_RATINGS } = props;

  const topRatingsComponents = sortBy(foodRatings, ['score'])
    .slice(0, 2)
    .map((foodRating, index) => {
      return (
        <ListItem key={foodRating.id}>
          <TrophyIcon
            fontSize="large"
            htmlColor={getHtmlColorForTrophy(index)}
            style={{ paddingLeft: '4px', height: '40px', width: '40px' }}
          />
          <Box mx="auto" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography variant="body1" color="primary" style={{ fontWeight: 500 }}>
              {foodRating.food.name}
            </Typography>
            <Typography variant="caption">Lorenzo's Pizzeria</Typography>
          </Box>
          <Avatar>
            <Typography variant="h6" component="p">
              {foodRating.score}
            </Typography>
          </Avatar>
        </ListItem>
      );
    });

  return (
    <List label={label} creatable={false}>
      {topRatingsComponents.length ? (
        topRatingsComponents
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
          <Typography variant="overline">You do not have any ratings yet!</Typography>
          <Typography align="center" variant="body2">
            Your top ranked pizzas will appear here. Try creating or joining a pizza tour to get started.
          </Typography>
        </Box>
      )}
    </List>
  );
};

export default memo(TopRatingsList);
