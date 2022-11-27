import React, { PropsWithChildren } from 'react'
import { BaseLayout } from '../components/layouts/BaseLayout'

// TODO: ProtectedModule is not needed since using middleware
const ProtectedModule: React.FC<PropsWithChildren> = ({ children }) => {
  // TODO: Pass navigation component to BaseLayout (report accident will have different navigation)
  return <BaseLayout>{children}</BaseLayout>
}

export { ProtectedModule }
