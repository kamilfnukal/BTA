import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_BRNO_BIKE_ACCIDENTS, API_BRNO_BIKE_ACCIDENTS_DEV } from '../const/api'
import { BrnoBikeAccidentsResponse } from '../types/api'

export const getBrnoBikeAccidents = async (): Promise<BrnoBikeAccidentsResponse> => {
  const response = await axios.get(API_BRNO_BIKE_ACCIDENTS)
  return response.data.features
}

export const useBrnoBikeAccidents = () => {
  return useQuery(['brno-bike-accidents'], getBrnoBikeAccidents, {
    staleTime: 60
  })
}

export const filterAccidents = (accidents: BrnoBikeAccidentsResponse, query: string) => {
  return accidents.filter(x => x.attributes.nazev.includes(query) || x.attributes.pricina.includes(query))
}
