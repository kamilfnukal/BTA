import { StaticImageData } from 'next/image'
import { Coord } from './index'
import { EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE } from '../const/api'

export type BrnoBikeAccidentsResponse = typeof EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE[]

export type WeatherPrecipitationResponse = ({
  [key in number]: number | string // 1-31, "" if shorter month
} & {
  month: number
  year: number
})[]

export type WeatherTemperatureResponse = WeatherPrecipitationResponse
