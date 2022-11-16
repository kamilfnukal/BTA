import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../components/atoms'

const LandingPage: NextPage = () => {
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (data && data.user) router.replace('/auth/home')
  }, [data])

  return (
    <div className="text-red-700">
      <Button label="Label" onClick={() => console.log('A')} />
      <Button onClick={() => signIn('google')} label="Sign in" />
    </div>
  )
}

export default LandingPage
