import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { Button } from '../components/atoms'

const LandingPage: NextPage = () => {
  return (
    <div className="text-red-700">
      <Button label="Label" onClick={() => console.log('A')} />
      <Button onClick={() => signIn('google')} label="Sign in" />
    </div>
  )
}

export default LandingPage
