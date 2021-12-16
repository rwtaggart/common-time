/**
 * Component for rendering the nodes along the TimeLine
 * This is responsible for managing the timeline continuum of events.
 */
import React from 'react';
import { timeFmt, dateFmt, parseDate, parseTime } from './utils.js'
import eachMinuteOfInterval from 'date-fns/eachMinuteOfInterval'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import setDate from 'date-fns/set'
import addMinutes from 'date-fns/addMinutes'
import addTime from 'date-fns/add'
import maxTime from 'date-fns/max'
import minTime from 'date-fns/min'

const zeros = {minutes:0, seconds:0, milliseconds:0}

function fuzzyIntervalOverlap(a, b) {
  if (a == null || b == null 
    || a.start == null || b.start == null
    || a.end == null || b.end == null) {
    return false
  }
  let afuzzy = {
    start: addTime(a.start, {seconds: -10}),
    end: addTime(a.end, {seconds: 10}),
  }
  let bfuzzy = {
    start: addTime(b.start, {seconds: -10}),
    end: addTime(b.end, {seconds: 10}),
  }
  return areIntervalsOverlapping(afuzzy, bfuzzy)
}

function findTimeBlocks(dateStr, selTimes, timeStep) {
  // FIXME: .map() will not return the correct size (reduce instead ?)
  // Need to break this out to another function
  // const dateStr = kv[0]
  // const selTimes = kv[1]
  console.log('(D): DateTimes Entries: ', timeStep, dateStr, selTimes)
  if (selTimes.length == 0) {
    return [dateStr, ['NA']]
  }
  let firstTime = parseTime(dateStr, selTimes[0])
  let blocks = [{
    start: firstTime, 
    end: addMinutes(firstTime, timeStep)
  }];
  // console.log('(D): blocks 0: ', dateStr, selTimes[0], firstTime, blocks)
  let pervIdx = 0;
  for (let idx = 1; idx < selTimes.length; idx++) {
    let nextStart = parseTime(dateStr, selTimes[idx])
    let nextBlock = {
      start: nextStart,
      end: addMinutes(nextStart, timeStep),
    }
    // console.log('(D): blocks: ', idx, pervIdx, blocks, blocks[pervIdx], nextBlock)
    if (fuzzyIntervalOverlap(blocks[pervIdx], nextBlock)) {
      // console.log('(D): min max ', 
      //   minTime([blocks[pervIdx].start, nextBlock.start]),
      //   maxTime([blocks[pervIdx].end, nextBlock.end])
      // )
      blocks[pervIdx].start = minTime([blocks[pervIdx].start, nextBlock.start])
      blocks[pervIdx].end = maxTime([blocks[pervIdx].end, nextBlock.end])
      // console.log('(D): fuzzy ', idx, pervIdx, nextBlock, blocks[pervIdx])
    } else {
      pervIdx++
      blocks.push(nextBlock)
    }
  }
  let blockStrs = blocks.map( interval => `${timeFmt(interval.start)}-${timeFmt(interval.end)}`).join('; ')
  return [dateStr, blockStrs]
}


function DebugNodeInfo(props) {
  const { start, end, title, description, link } = props
  // displayTime, beginRefTime, endRefTime
  if (props == null) {
    return <div>Empty Node</div>
  }
  return (
    <div>
      <div>
        <span>Start</span>
        <span>Display: {start && start.displayTime}</span>
        <span>Begin: {start && start.beginRefTime}</span>
        <span>End: {start && start.endRefTime}</span>
      </div>
      <div>
        <span>End</span>
        <span>Display: {end && end.displayTime}</span>
        <span>Begin: {end && end.beginRefTime}</span>
        <span>End: {end && end.endRefTime}</span>
      </div>
      <span>Node Info: {JSON.stringify(props)}</span>
    </div>
  )
}

/**
 * 
 */
export function TimeBlock(props) {
  const { time, isSelected, setIsSelected } = props
  let style = isSelected ? "time-block-selected" : "time-block"
  // onMouseDown={(e) => {setIsSelected(time)}}
  return (
    <div onClick={(e) => {setIsSelected(time)}} className={style} >
      <span>{time}</span>
    </div>
  )
}

/**
 * DayBlock Component
 * Render a column of times in a day
 * @param date: string "MMM dd"
 * @param timeRange: [begin, end]
 * @param timeIncrements size of each time block (minutes)
 * TODO: 
 *   + Add support for shift / Cmd click...
 */
export function DayBlock(props) {
  const { date, timeRange, timeStep, selectedTimes, setSelectedTimes } = props
  const updateSelectedTimes = (time) => {
    // TODO: Add remove from list if "deselected"
    let d = selectedTimes.get(date)
    let idx = d.indexOf(time)
    if (idx >= 0) {
      d.splice(idx, 1)
    } else {
      d.push(time)
      let orderedTimes = d.map(t => parseTime(date, t)).sort().map(dt => timeFmt(dt))
      selectedTimes.set(date, orderedTimes)
      console.log('(D): times: ', date, d, orderedTimes, selectedTimes)
    }
    setSelectedTimes(map => new Map(selectedTimes))
  }
  let startTimes = eachMinuteOfInterval(
    {
      start: setDate(parseDate(date), {...zeros, hours:timeRange.start}),
      end:   setDate(parseDate(date), {...zeros, hours:timeRange.end}),
    },
    { step: timeStep }
  )
  return (
    <div className="time-column">
      {/* <h2>{format(date, 'MMM dd')}</h2> */}
      <h2>{date}</h2>
      { startTimes.map((time) => 
        <TimeBlock 
          key={date + time}
          time={timeFmt(time)}
          isSelected={selectedTimes.get(date).includes(timeFmt(time))} 
          setIsSelected={updateSelectedTimes}
        />
      )}
    </div>
  )
}

/**
 * Used for rendering the times selected as debug text output
 */
export function RenderSelectedTimes(props) {
  const { dateTimes } = props
  return (
    <div className="app-column">
      {[...dateTimes.entries()].map( (e) =>
        <span className="app-row" key={e[0]}>
          {/* <span style={{'font-weight': 'bold'}}>{format(e[0], 'yyyy MMM dd HH:mm:ss.SSS')}</span>: {e[1].join('; ')} */}
          <span style={{'fontWeight': 'bold'}}>{e[0]}</span> 
          <span style={{'fontFamily': 'monospace'}}>{e[1].join('; ')}</span>
        </span>
      )}
    </div>
  )
}

/**
 * Used for rendering the times selected as debug text output
 * Group overlapping times into common block intervals
 */
export function RenderSelectedGroupedTimes(props) {
  const { dateTimes, timeStep } = props
  console.log('(D): Render Groups...')
  let DateTimeBlockStrs = [...dateTimes.entries()].map( kv => findTimeBlocks(kv[0], kv[1], timeStep) )  // TODO: Sort the time array
  return (
    <div className="app-column">
        {DateTimeBlockStrs.map( (kv => (
            <span className="app-row" key={kv[0]}>
              {/* <span style={{'font-weight': 'bold'}}>{format(e[0], 'yyyy MMM dd HH:mm:ss.SSS')}</span>: {e[1].join('; ')} */}
              <span style={{'fontWeight': 'bold'}}>{kv[0]}</span> 
              <span style={{'fontFamily': 'monospace'}}>{kv[1]}</span>
            </span>
          )
      ))}
    </div>
  )
}

/**
 * Export times data to string
 */
export function FormatTimesStr(dateTimes) {
  // if (dateTimes == null) return "";
  return [...dateTimes.entries()].map( kv => `${kv[0]}: ${kv[1].join(';')}` ).join('\n')
}

/**
 * Export grouped time blocks to string
 */
export function FormatGroupedTimesStr(timeStep, dateTimes) {
  // if (dateTimes == null) return "";
  return [...dateTimes.entries()]
    .map( kv => {
      let [dateStr, timeBlockStr] = findTimeBlocks(kv[0], kv[1], timeStep)
      return `${dateStr}:  ${timeBlockStr}`
    })
    .join('\n')
  // return [...dateTimes.entries()].map( kv => `${kv[0]}: ${kv[1].join(';')}` ).join('\n')
}
