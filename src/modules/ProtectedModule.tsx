import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import LOGO from '../../public/BBT_logo-b.png'
import { BaseLayout } from '../components/layouts/BaseLayout'

const ProtectedModule: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/')
  }, [status])

  // TODO: Pass navigation component to BaseLayout (report accident will have different navigation)
  return <BaseLayout>{children}</BaseLayout>
}

export { ProtectedModule }
