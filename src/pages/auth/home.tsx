import { NextPage } from 'next'
import { HomeModule, ProtectedModule } from '../../modules'

const HomePage: NextPage = () => <ProtectedModule Module={HomeModule} />

export default HomePage
