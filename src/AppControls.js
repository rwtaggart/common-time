/**
 * App Controls and User Settings
 */
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

// const iOSBoxShadow =
// '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  // '& .MuiSlider-thumb': {
  //   height: 28,
  //   width: 28,
  //   backgroundColor: '#fff',
  //   boxShadow: iOSBoxShadow,
  //   '&:focus, &:hover, &.Mui-active': {
  //     boxShadow:
  //       '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
  //     // Reset on touch devices, it doesn't add specificity
  //     '@media (hover: none)': {
  //       boxShadow: iOSBoxShadow,
  //     },
  //   },
  // },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 40,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    // '&:before': {
    //   display: 'none',
    // },
    // '& *': {
    //   background: 'transparent',
    //   color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    // },
  },
  // '& .MuiSlider-track': {
  //   border: 'none',
  // },
  // '& .MuiSlider-rail': {
  //   opacity: 0.5,
  //   backgroundColor: '#bfbfbf',
  // },
  // '& .MuiSlider-mark': {
  //   backgroundColor: '#bfbfbf',
  //   height: 8,
  //   width: 1,
  //   '&.MuiSlider-markActive': {
  //     opacity: 1,
  //     backgroundColor: 'currentColor',
  //   },
  // },
}));


export default function AppControls(props) {
  const { 
    timeStep, setTimeStep, 
    dayHoursRange, setDayHoursRange, 
    resetTimesMap 
  } = props

  // TODO: Stuff app controls into component
  // (e, range) => setDayHoursRange(range)
  const handleHoursChange = (event, newValue, activeThumb) => {
    const minDistance = 1
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setDayHoursRange([Math.min(newValue[0], dayHoursRange[1] - minDistance), dayHoursRange[1]]);
    } else {
      setDayHoursRange([dayHoursRange[0], Math.max(newValue[1], dayHoursRange[0] + minDistance)]);
    }
  };

  return (
    <>
      <Box sx={{width: '20vw' }}>
        {/* <Slider */}
        <FormLabel component="legend">Hours Range</FormLabel>
        <IOSSlider
          // gutterBottom
          getAriaLabel={() => 'Day Hours Range'}
          value={dayHoursRange}
          onChange={ handleHoursChange }
          valueLabelDisplay="on"
          disableSwap
          min={0}
          max={24}
          size="small"
          // getAriaValueText={dayHoursRange.join(' - ')}
        />
      </Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Time Step</FormLabel>
        <RadioGroup 
            row
            aria-label="Time Step" name="timestep-opt"
            value={timeStep}
            onChange={e => setTimeStep(e.target.value)}
        >
          <FormControlLabel value={60} label="60" control={<Radio/>} />
          <FormControlLabel value={30} label="30" control={<Radio/>} />
          <FormControlLabel value={15} label="15" control={<Radio/>} />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={() => { resetTimesMap(); }}>Reset</Button>
      <span> </span>  {/* FIXME: This is a hack */}
    </>
  );
}