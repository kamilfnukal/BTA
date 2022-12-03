import { Session } from 'next-auth'
import { BrnoBikeAccidentsResponse } from './api'

declare global {
  interface Window {
    SMap: any
    Loader: any
  }
}

type UseAuthLoaded = {
  isLoading: false
  user: NonNullable<Session['user']>
}

type UseAuthLoading = {
  isLoading: true
  user: null
}

export type Coord = {
  lat: number
  lng: number
}

export type UseAuth = UseAuthLoaded | UseAuthLoading

export type HomeModuleDayProps = {
  temperature: string | number
  precipitation: string | number
  accidents: BrnoBikeAccidentsResponse
}

export type HomePageProps = {
  yesterday: HomeModuleDayProps
  today: HomeModuleDayProps
  tomorrow: HomeModuleDayProps
}
