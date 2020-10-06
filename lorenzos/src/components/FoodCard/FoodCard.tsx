import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PizzaIcon from '@material-ui/icons/LocalPizza';

interface FoodCard {
  name: string;
  score?: number;
  image?: string;
  overview?: string;
}

const FoodCard = ({ name, score, image, overview }: FoodCard) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {score ? (
              <Typography variant="h6" component="p">
                {score}
              </Typography>
            ) : (
              <PizzaIcon />
            )}
          </Avatar>
        }
        title={
          <>
            <Typography style={{ fontWeight: 'bold' }} variant="body1">
              {name}
            </Typography>
          </>
        }
      />
      <Divider />
      <CardMedia style={{ height: '200px' }} image={image} />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography variant="overline">Overview</Typography>
          <Typography variant="body2" color="textSecondary">
            {overview}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(FoodCard);
