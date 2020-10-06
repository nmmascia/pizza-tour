import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FoodCard from '../FoodCard';

const TourLocationPage = () => {
  return (
    <Box height="100%" width="100%">
      <Box display="flex" justifyContent="space-between" pb={1}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" component="h2">
            Grimaldi's Pizzeria
          </Typography>
          <Typography variant="caption" component="span">
            Brooklyn
          </Typography>
        </Box>
        <Typography variant="body2">Oct. 4th</Typography>
      </Box>
      <Divider />
      <Box p={1}>
        <Box mb={1}>
          <FoodCard
            name="Traditional"
            score={7.0}
            image="https://4.bp.blogspot.com/-n-jZjyEzncE/Uq8IxN6-giI/AAAAAAAADWk/OL-YhSPEG_4/s1600/Pizza+Food+Hd+Wallpaper.jpg"
            overview="It was ok one of the pie's did not hold up to the fold and the white pziza did not hold up to the fold"
          />
        </Box>
        <FoodCard
          name="Margherita"
          image="http://searchengineland.com/figz/wp-content/seloads/2015/08/pepperoni-pizza-food-hungry-ss-1920.jpg"
          overview="It was ok one of the pie's did not hold up to the fold and the white pziza did not hold up to the fold"
        />
      </Box>
    </Box>
  );
};

export default memo(TourLocationPage);
