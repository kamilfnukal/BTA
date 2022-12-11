import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { YEAR_OFFSET } from '../const'
import { BrnoBikeAccidentsResponse, WeatherPrecipitationResponse, WeatherTemperatureResponse } from '../types/api'
import { getBrnoBikeAccidents } from './accidents'

const WEATHER_PRECIPITATION_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API_BASE
const WEATHER_TEMPERATURE_API_BASE = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_BASE
const WEATHER_PRECIPITATION_API_KEY = process.env.NEXT_PUBLIC_WEATHER_PRECIPITATION_API_KEY
const WEATHER_TEMPERATURE_API_KEY = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_KEY

const getWeatherQuery = (year: number) => `?q={%22year%22:%20${year}}&max=15&skip=0`

export const getPrecipitation = async (year: number): Promise<WeatherPrecipitationResponse> => {
  const response = await axios.get(`${WEATHER_PRECIPITATION_API_BASE}precipitation${getWeatherQuery(year)}`, {
    headers: {
      'x-apikey': WEATHER_PRECIPITATION_API_KEY
    }
  })
  return response.data
}

export const usePrecipitation = () => {
  return useQuery(['precipitation'], () => getPrecipitation(new Date().getFullYear() - YEAR_OFFSET))
}

export const getTemperature = async (year: number): Promise<WeatherTemperatureResponse> => {
  const response = await axios.get(`${WEATHER_TEMPERATURE_API_BASE}temp-avg${getWeatherQuery(year)}`, {
    headers: {
      'x-apikey': WEATHER_TEMPERATURE_API_KEY
    }
  })
  return response.data
}

export const useTemperature = () => {
  return useQuery(['temperature'], () => getTemperature(new Date().getFullYear() - YEAR_OFFSET))
}

const filterWeatherByDate = (weatherResponse: WeatherTemperatureResponse, date: Date) => {
  return weatherResponse[date.getMonth()][date.getDate()]
}

const filerAccidentsByDate = (accidentsResponse: BrnoBikeAccidentsResponse, date: Date) => {
  // TODO: fix via `datum`
  return accidentsResponse.filter(
    ({ attributes: { den, mesic, rok } }) =>
      den === date.getDate() && mesic === date.getMonth() && rok === date.getFullYear() - YEAR_OFFSET
  )
}

const isSameYear = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear()

const fetchWeatherDifferentYear = async (date: Date) => {
  const year = date.getFullYear() - YEAR_OFFSET
  return [await getTemperature(year), await getPrecipitation(year)]
}

export const getHomeData = async () => {
  const now = new Date()
  const yesterday = new Date()
  const tomorrow = new Date()

  yesterday.setDate(now.getDate() - 1)
  tomorrow.setDate(now.getDate() + 1)

  const [temperatureToday, precipicationToday, accidents] = await Promise.all([
    getTemperature(now.getFullYear() - YEAR_OFFSET),
    getPrecipitation(now.getFullYear() - YEAR_OFFSET),
    getBrnoBikeAccidents()
  ])

  const [tempYesterday, precipYesterday] = isSameYear(now, yesterday)
    ? [temperatureToday, precipicationToday]
    : await fetchWeatherDifferentYear(yesterday)

  const [tempTomorrow, precipTomorrow] = isSameYear(now, tomorrow)
    ? [temperatureToday, precipicationToday]
    : await fetchWeatherDifferentYear(tomorrow)

  return {
    yesterday: {
      temperature: filterWeatherByDate(tempYesterday, yesterday),
      precipitation: filterWeatherByDate(precipYesterday, yesterday),
      accidents: filerAccidentsByDate(accidents, yesterday)
    },
    today: {
      temperature: filterWeatherByDate(temperatureToday, now),
      precipitation: filterWeatherByDate(precipicationToday, now),
      accidents: filerAccidentsByDate(accidents, now)
    },
    tomorrow: {
      temperature: filterWeatherByDate(tempTomorrow, tomorrow),
      precipitation: filterWeatherByDate(precipTomorrow, tomorrow),
      accidents: filerAccidentsByDate(accidents, tomorrow)
    }
  }
}
