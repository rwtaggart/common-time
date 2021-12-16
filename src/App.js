import * as React from 'react';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CopyIcon from '@mui/icons-material/ContentCopy';

import { CustomDay } from "./DatePicker.js"
import AppControls from "./AppControls.js"
import { DayBlock, RenderSelectedGroupedTimes, FormatGroupedTimesStr } from "./TimeBlock.js"


function App() {
  // TODO: Manage these via Redux
  const [ timesMap, setTimesMap ] = React.useState(new Map())
  const [ timeStep, setTimeStep ] = React.useState(60)
  const [ copyErrMsg, setCopyErrMsg ] = React.useState(null)
  const [ dayHoursRange, setDayHoursRange ] = React.useState([8, 17]);  // TODO: use object {start, end}

  function resetTimesMap() { setTimesMap(new Map()) };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleCopy = (e) => {
    let copyText = FormatGroupedTimesStr(timeStep, timesMap)
    console.log('(D): copyText: ', copyText)
    if (navigator.clipboard == null) {
      setCopyErrMsg("unable to copy")
      return
    }
    navigator.clipboard.writeText(copyText)
    .then(null, (err) => {
      setCopyErrMsg("Copied failed")
    });
  }

  return (
    <div className="App">
      <header className="app-header">
        <ThemeProvider theme={darkTheme}>
          <Stack direction="row" spacing={1}>
            <span className="app-title">Common Time</span>
            <Tooltip title="Copy">
              <IconButton aria-label="copy" onClick={handleCopy}><CopyIcon /></IconButton>
            </Tooltip>
          </Stack>
          <AppControls
            timeStep={timeStep}
            setTimeStep={setTimeStep}
            dayHoursRange={dayHoursRange}
            setDayHoursRange={setDayHoursRange}
            resetTimesMap={resetTimesMap}
          />
        </ThemeProvider>
      </header>
      <main className="app-content">
        {/* <h1>Select dates</h1> */}
        <div className="app-row">
          <div className="app-column">
            <CustomDay selectedDates={timesMap} setSelectedDates={setTimesMap} ></CustomDay>
          </div>
          { [...timesMap.keys()].map(date =>
            <DayBlock
              key={date}
              date={date}
              timeRange={{start: dayHoursRange[0], end: dayHoursRange[1]}}
              timeStep={timeStep}
              selectedTimes={timesMap}
              setSelectedTimes={setTimesMap}
            />
          ) }
        </div>
        {/* <div>{timesMap.size}</div> */}
        <div>
          {/* <div> */}
          <Stack direction="row" spacing={1}>
            <h2>Available times</h2>
            <Tooltip title="Copy">
              <IconButton aria-label="copy" onClick={handleCopy}><CopyIcon /></IconButton>
            </Tooltip>
            {copyErrMsg != null && <span style={{'color': 'red'}}>{copyErrMsg}</span>}
          </Stack>
          {/* </div> */}
          {/* <RenderSelectedTimes dateTimes={timesMap} /> */}
          <RenderSelectedGroupedTimes dateTimes={timesMap} timeStep={timeStep} />
        </div>
        <br/>
        {/* <div>{[...timesMap.keys()].map(t => format(t, 'yyyy MMM dd HH:mm:ss.SSS')).join('; ')}</div> */}
        {/* <div>{[...timesMap.keys()].join('; ')}</div> */}
      </main>
    </div>
  );
}

export default App;
