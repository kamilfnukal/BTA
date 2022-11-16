import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import LOGO from '../../public/BBT_logo-b.png'
import { BaseLayout } from '../components/layouts/BaseLayout'

const ProtectedModule: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/')
  }, [status])

  // TODO: Pass navigation component to BaseLayout (report accident will have different navigation)
  // TODO: Fix auth
  return data?.user ? <BaseLayout>{children}</BaseLayout> : null
}

export { ProtectedModule }
