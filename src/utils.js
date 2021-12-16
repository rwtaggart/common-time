/**
 * Utility Methods
 */

import { format, parse } from 'date-fns'

export function dateFmt(date) {
  return format(date, 'EEE, MMM. dd')
}

export function timeFmt(time) {
  return format(time, 'h:mmaaa')
}

export function parseDate(dateStr) {
  return parse(dateStr, 'EEE, MMM. dd', new Date())
}

export function parseTime(dateStr, timeStr) {
  return parse(dateStr + ' ' + timeStr, 'EEE, MMM. dd h:mmaaa', new Date())
}
