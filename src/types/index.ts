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
