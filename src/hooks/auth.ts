import { useSession } from 'next-auth/react'
import { UseAuth } from '../types'

// TODO: will still be used?
export const useAuth = () => {
  const { data, status } = useSession()

  // if not user, ProtectedModule will redirect to signin page
  const isLoading = status === 'loading' || !data?.user
  const user = isLoading ? null : data.user!

  return {
    isLoading,
    user
  } as UseAuth
}
