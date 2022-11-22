import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { YEAR_OFFSET } from '../const'
import { WeatherPrecipitationResponse, WeatherTemperatureResponse } from '../types/api'

const WEATHER_PRECIPITATION_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API_BASE
const WEATHER_TEMPERATURE_API_BASE = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_BASE
const WEATHER_PRECIPITATION_API_KEY = process.env.NEXT_PUBLIC_WEATHER_PRECIPITATION_API_KEY
const WEATHER_TEMPERATURE_API_KEY = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_KEY

const getWeatherQuery = (year: number) => `?q={%22year%22:%20${year}}&max=15&skip=0`

const getPrecipitation = async (year: number): Promise<WeatherPrecipitationResponse> => {
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

const getTemperature = async (year: number): Promise<WeatherTemperatureResponse> => {
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
