import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';
import PizzaIcon from '@material-ui/icons/LocalPizzaRounded';

interface FoodRatingSliderPanelProps {
  score: number;
}

const FoodRatingSliderPanel = ({ score: inputScore }: FoodRatingSliderPanelProps) => {
  const [value, setValue] = useState(inputScore * 10);
  const score = value / 10;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={2} px={4}>
      <Box pt={1}>
        <Typography variant="overline" align="center" component="p" style={{ lineHeight: 1.2 }}>
          Rating
        </Typography>
        <Typography variant="h6" align="center">
          Traditional
        </Typography>
      </Box>
      <Box py={2} display="flex" justifyContent="center" alignItems="center" width="100%">
        <PizzaIcon color="secondary" />
        <Box px={1}>
          <Avatar style={{ height: 60, width: 60 }}>{score}</Avatar>
        </Box>
        <PizzaIcon color="secondary" />
      </Box>
      <Box pb={2} width="100%">
        <Slider
          color="primary"
          value={value}
          onChange={(_event, value) => {
            if (!Array.isArray(value)) {
              setValue(value);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default FoodRatingSliderPanel;
