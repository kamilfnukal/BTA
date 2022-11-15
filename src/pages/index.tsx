import { NextPage } from 'next'
import { Button } from '../components/atoms'

const LandingPage: NextPage = () => {
  return (
    <div className="text-red-700">
      <Button label="Label" onClick={() => console.log('A')} />
    </div>
  )
}

export default LandingPage
