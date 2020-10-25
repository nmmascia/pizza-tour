import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FoodCard from '../FoodCard';
import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router-dom';
import parseISO from 'date-fns/parseISO';
import FormattedDate from '../FormattedDate';
import Drawer from '@material-ui/core/Drawer';
import FoodRatingSliderPanel from '../FoodRatingSliderPanel';
import ParticipantAvatarGroup from '../ParticipantAvatarGroup';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import CircularProgress from '@material-ui/core/CircularProgress';

const PAGE_QUERY = `
query($id: Int!) {
  tourLocation(id: $id) {
    id
    date
    location {
      id
      name
    }
    tour {
      id
      name
      users {
        id
        username
      }
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
`;

const UPDATE_RATING_MUTATION = `
  mutation($id: Int!, $score: Float!) {
    foodRatingSave(id: $id, score: $score) {
      id
      score
    }
  }
`;

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
  tour: {
    id: string;
    name: string;
    users: Array<{
      id: string;
      username: string;
    }>;
  };
}

const TourLocationPage = () => {
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState<number | undefined>();
  const [activeUser, setActiveUser] = useState<number>(1);

  const { tourLocationId } = useParams();
  const [{ data, fetching }] = useQuery({
    query: PAGE_QUERY,
    variables: {
      id: parseInt(tourLocationId, 10),
    },
  });

  const [, updateRating] = useMutation(UPDATE_RATING_MUTATION);

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="100%">
        <CircularProgress />
      </Box>
    );
  }

  const tourLocation: TourLocation = data?.tourLocation || {};

  const foodRatingsByUserId = groupBy((tourLocation && tourLocation.foodRatings) || [], 'user.id');
  const participants = uniqBy((tourLocation && tourLocation.foodRatings) || [], 'user.id').map((fr) => fr.user); //| tourLocation.tour.users;
  const activeUserDetails = participants.find((participant) => participant.id === activeUser);

  const foodRatingComponents = sortBy(foodRatingsByUserId[activeUser] || [], 'id').map((foodRating) => {
    return (
      <Box flex="1 0 350px" maxWidth="350px" margin="0 auto" key={foodRating.id} m={1}>
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
      <Box py={1}>
        <Typography align="center" color="primary" variant="body1" component="h1" style={{ fontWeight: 'bold' }}>
          {tourLocation?.tour?.name}
        </Typography>
      </Box>
      <Box height="100%" width="100%">
        <Box display="flex" justifyContent="space-between" pb={1}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" component="h2" color="primary">
              {data?.tourLocation?.location?.name}
            </Typography>
            <Typography variant="caption" component="span">
              Brooklyn, NY
            </Typography>
          </Box>

          <Typography variant="body2">
            <FormattedDate date={parseISO(tourLocation.date)} />
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" width="100%">
          <Divider />
          <ParticipantAvatarGroup
            activeIds={[activeUser]}
            participants={participants}
            onClick={(value) => setActiveUser(value)}
          />
          <Divider />
          {activeUserDetails && (
            <Box py={0.5} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body2">{activeUserDetails.username}</Typography>
            </Box>
          )}
          <Box display="inline-flex" flexWrap="wrap" justifyContent="center" alignItems="center" m="0 auto">
            {foodRatingComponents}
          </Box>
        </Box>
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
          onChangeCommitted={async (value) => {
            await updateRating({
              id: openedFoodRating?.id,
              score: value,
            });

            setRatingDrawerOpen(undefined);
          }}
        />
      </Drawer>
    </>
  );
};

export default memo(TourLocationPage);
