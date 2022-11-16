import { NextPage } from 'next'
import { HomeModule, ProtectedModule } from '../../modules'

const HomePage: NextPage = () => (
  <ProtectedModule>
    <HomeModule />
  </ProtectedModule>
)

export default HomePage
