import { Session } from 'next-auth'

type UseAuthLoaded = {
  isLoading: false
  user: NonNullable<Session['user']>
}

type UseAuthLoading = {
  isLoading: true
  user: null
}

export type UseAuth = UseAuthLoaded | UseAuthLoading

export type HomeModuleDayProps = {
  temperature: string | number
  precipitation: string | number
}

export type HomePageProps = {
  yesterday: HomeModuleDayProps
  today: HomeModuleDayProps
  tomorrow: HomeModuleDayProps
}
