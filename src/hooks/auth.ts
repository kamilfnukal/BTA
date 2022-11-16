import { useSession } from 'next-auth/react'
import { UseAuth } from '../types'

export const useAuth = () => {
  const { data, status } = useSession()

  const isLoading = status === 'loading'
  const user = isLoading ? null : data!.user

  return {
    isLoading,
    user
  } as UseAuth
}
