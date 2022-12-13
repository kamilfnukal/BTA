import { BrnoBikeAccidentsResponse } from '../types/api'
import { Location, UserLocation } from './firebase'

export const setListener = (isReady: () => any, onReady: () => void) => {
  const readyListener = (): NodeJS.Timeout | undefined => {
    if (isReady()) {
      onReady()
      return
    }
    return setTimeout(readyListener, 1000)
  }
  readyListener()
}

export const getWeeks = (year: number): Date[][] => {
  const firstDayOfYear = new Date(year, 0, 1)
  const lastDayOfYear = new Date(year, 11, 31)
  const firstDay = new Date(
    firstDayOfYear.getTime() + 86400000 * (1 - (firstDayOfYear.getDay() == 0 ? 7 : firstDayOfYear.getDay()))
  )
  const lastDay = new Date(
    lastDayOfYear.getTime() + 86400000 * (7 - (lastDayOfYear.getDay() == 0 ? 7 : lastDayOfYear.getDay()))
  )

  const weeks: Date[][] = []
  let currentWeek: Date[] = []
  let currentDate = firstDay

  while (currentDate <= lastDay) {
    currentWeek.push(currentDate)

    if (currentDate.getDay() === 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentDate = new Date(currentDate.getTime() + 86400000)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

export const getAccidentsInLocations = (accidents: BrnoBikeAccidentsResponse, locations: Location[]) => {
  const result: { [key in Location['id']]: BrnoBikeAccidentsResponse } = {}

  for (const { distance, coordinate, id } of locations) {
    result[id] = accidents
      .filter(
        ({ geometry }) =>
          coordinate.lat - distance <= geometry.y &&
          geometry.y <= coordinate.lat + distance &&
          coordinate.lng - distance <= geometry.x &&
          geometry.x <= coordinate.lng + distance
      )
      .map((acc) => acc)
    // TODO: map only fields needed for plan trip page to reduce total amount of data (MB)
  }
  const assignedAccidentIds = ([] as BrnoBikeAccidentsResponse)
    .concat(...Object.values(result))
    .map(({ attributes: { id } }) => id)

  result['other'] = accidents.filter(({ attributes: { id } }) => !assignedAccidentIds.includes(id))

  return result
}
