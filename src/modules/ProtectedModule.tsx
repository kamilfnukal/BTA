import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect } from 'react'

type ProtectedModuleProps = {
  Module: FunctionComponent<{ isLoading: boolean }>
}

const ProtectedModule: React.FC<ProtectedModuleProps> = ({ Module }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/')
  }, [status])

  const isLoading = status === 'loading'

  return <Module isLoading={isLoading} />
}

export { ProtectedModule }
