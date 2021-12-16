import * as React from 'react';
import { styled } from '@mui/material/styles';
import PickersDay from '@mui/lab/PickersDay';
import isWeekend from 'date-fns/isWeekend';
import { compareAsc } from 'date-fns'
import setDate from 'date-fns/set'
import { timeFmt, dateFmt, parseDate, parseTime } from './utils.js'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

export function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        openTo="day"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isHighlight',
})(
  ({ theme, isHighlight }) => ({
    ...(isHighlight && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
          backgroundColor: theme.palette.primary.dark,
        },
      }
    )
  })
);

const CustomPickersDay2 = styled(PickersDay, 
  {shouldForwardProp: (props) => (props !== 'isHighlight') })
(({theme, isHighlight}) => ({
  ...(isHighlight && {
    // borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  })
}));


export function CustomDay(props) {
  const { selectedDates, setSelectedDates } = props
  const [value, setValue] = React.useState([new Date()]);

  const renderWeekPickerDay = (date, _selectedDates, pickersDayProps) => {
    let fdstr = dateFmt(date)
    // console.log('(D): DATE: ', format(date, 'yyyy MMM dd HH:mm:ss.SSS'), fdstr, selectedDates.get(fdstr))

    if ( selectedDates.size == 0 ) {
      return <PickersDay {...pickersDayProps} />;
    } else if ( selectedDates.get(fdstr) == null ) {
      return <CustomPickersDay2 isHighlight={false} {...pickersDayProps}/>
      return <PickersDay {...pickersDayProps} />;
    } else {
      return <CustomPickersDay2 isHighlight={true} {...pickersDayProps}/>
    }
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          // label="Week picker"
          // orientation="landscape"
          value={null}
          shouldDisableDate={isWeekend}
          allowSameDateSelection={true}
          onChange={(selDate) => {
            let selDate0 = setDate(selDate,{hours:0, minutes:0, seconds:0, milliseconds:0})
            let fdstr = dateFmt(selDate0)
            console.log('DPkr chg: ', selDate, fdstr, selectedDates.has(fdstr))
            if (selectedDates.has(fdstr)) {
              selectedDates.delete(fdstr)
            } else {
              selectedDates.set(fdstr, [])
            }
            setSelectedDates(map => new Map([...selectedDates].sort((a,b) => compareAsc(parseDate(a[0]), parseDate(b[0])))));
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        />
      </LocalizationProvider>
  );
}