import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WeatherPrecipitationResponse } from '../types/api'

const WEATHER_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API_BASE
const WEATHER_PRECIPITATION_API_KEY = process.env.NEXT_PUBLIC_WEATHER_PRECIPITATION_API_KEY

export const getPrecipitation = async (year: number): Promise<WeatherPrecipitationResponse> => {
  const response = await axios.get(`${WEATHER_API_BASE}precipitation?q={%22year%22:%20${year}}&max=15&skip=0`, {
    headers: {
      'x-apikey': WEATHER_PRECIPITATION_API_KEY
    }
  })
  return response.data
}

export const usePrecipitation = () => {
  return useQuery(['precipitation'], () => getPrecipitation(2012))
}
