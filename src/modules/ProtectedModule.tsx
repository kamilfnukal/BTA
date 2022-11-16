import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'

const ProtectedModule: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/')
  }, [status])

  // Add base auth layout here
  return <>{children}</>
}

export { ProtectedModule }
