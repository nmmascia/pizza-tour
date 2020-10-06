import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FoodCard from '../FoodCard';
import Skeleton from '@material-ui/lab/Skeleton';
import { useQuery } from 'urql';
import { useParams } from 'react-router-dom';
import parseISO from 'date-fns/parseISO';
import FormattedDate from '../FormattedDate';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import FoodRatingSliderPanel from '../FoodRatingSliderPanel';

interface TourLocationPageProps {
  fetching: boolean;
}

interface TourLocation {
  id: number;
  date: string;
  location: {
    id: number;
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

const TourLocationPage = ({ fetching: fetchingTour }: TourLocationPageProps) => {
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState<number | undefined>();

  const { tourLocationId } = useParams();
  const [{ data, fetching: fetchingTourLocation }] = useQuery({
    query: `
      query($id: Int!) {
        tourLocation(id: $id) {
          id
          date
          location {
            id
            name
          }
          foodRatings {
            id
            user {
              id
              username
            }
            score
            overview
            food {
              id
              name
            }
          }
        }
      }
    `,
    variables: {
      id: parseInt(tourLocationId, 10),
    },
    pause: fetchingTour,
  });

  const fetching = fetchingTour || fetchingTourLocation;

  const tourLocation: TourLocation | void = data?.tourLocation;

  const foodRatingComponents = ((tourLocation && tourLocation.foodRatings) || [])
    .filter((foodRating) => {
      return foodRating.user.id === 1;
    })
    .map((foodRating) => {
      return (
        <Box key={foodRating.id} mb={1}>
          <FoodCard
            name={foodRating.food.name}
            score={foodRating.score}
            image="https://4.bp.blogspot.com/-n-jZjyEzncE/Uq8IxN6-giI/AAAAAAAADWk/OL-YhSPEG_4/s1600/Pizza+Food+Hd+Wallpaper.jpg"
            overview="It was ok one of the pie's did not hold up to the fold and the white pziza did not hold up to the fold"
            fetching={fetching}
            onRatingClick={() => {
              setRatingDrawerOpen(foodRating.id);
            }}
          />
        </Box>
      );
    });

  const openedFoodRating = ((tourLocation && tourLocation.foodRatings) || []).find((foodRating) => {
    return foodRating.id === ratingDrawerOpen;
  });

  return (
    <>
      <Box height="100%" width="100%">
        <Box display="flex" justifyContent="space-between" pb={1}>
          <Box display="flex" flexDirection="column">
            {fetching ? (
              <Skeleton variant="text" height={25} width={175} />
            ) : (
              <Typography variant="h6" component="h2" color="primary">
                {data?.tourLocation?.location?.name}
              </Typography>
            )}
            {fetching ? (
              <Skeleton variant="text" height={20} width={75} />
            ) : (
              <Typography variant="caption" component="span">
                Brooklyn, NY
              </Typography>
            )}
          </Box>
          {fetching ? (
            <Skeleton variant="text" height={20} width={75} />
          ) : (
            <Typography variant="body2">
              <FormattedDate date={parseISO('2020-10-04')} />
            </Typography>
          )}
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center" alignItems="center" py={1}>
          <Avatar
            style={{
              height: 35,
              width: 35,
            }}
            src="http://headsup.boyslife.org/files/2014/03/Teenage-Mutant-Ninja-Turtles-2014-Michelangelo.jpg"
          />
        </Box>
        <Divider />
        <Box p={1}>{foodRatingComponents}</Box>
      </Box>
      <Drawer
        open={Boolean(ratingDrawerOpen)}
        anchor="bottom"
        onClose={() => {
          setRatingDrawerOpen(undefined);
        }}
      >
        <FoodRatingSliderPanel
          name={openedFoodRating && openedFoodRating.food.name}
          score={(openedFoodRating && openedFoodRating.score) || 0}
        />
      </Drawer>
    </>
  );
};

export default memo(TourLocationPage);
