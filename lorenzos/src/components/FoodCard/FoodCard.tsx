import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PizzaIcon from '@material-ui/icons/LocalPizza';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';

interface FoodCardProps {
  name: string;
  score?: number;
  image?: string;
  overview?: string;
  fetching?: boolean;
  onRatingClick: () => void;
}

const FoodCard = ({ name, score, image, overview, fetching, onRatingClick }: FoodCardProps) => {
  return (
    <Card>
      <CardHeader
        title={
          <>
            {fetching ? (
              <Skeleton variant="text" height={30} width={125} />
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontWeight: 'bold' }} variant="body1">
                  {name}
                </Typography>
                <IconButton size="small" onClick={onRatingClick}>
                  <Avatar>
                    {score && !fetching ? (
                      <Typography variant="h6" component="p">
                        {score}
                      </Typography>
                    ) : (
                      <PizzaIcon />
                    )}
                  </Avatar>
                </IconButton>
              </Box>
            )}
          </>
        }
      />
      {fetching ? <Skeleton variant="rect" height={200} /> : <CardMedia style={{ height: '200px' }} image={image} />}
      <CardContent>
        <Box display="flex" flexDirection="column">
          {fetching ? (
            <>
              <Skeleton variant="text" height={30} width={125} />
              <Skeleton variant="rect" height={100} width="100%" />
            </>
          ) : (
            <>
              <Typography variant="overline" color="primary" style={{ fontWeight: 'bold' }}>
                Overview
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {overview}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(FoodCard);
