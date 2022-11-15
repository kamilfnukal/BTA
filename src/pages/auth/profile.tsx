import { NextPage } from 'next'
import { ProfileModule, ProtectedModule } from '../../modules'

const ProfilePage: NextPage = () => <ProtectedModule Module={ProfileModule} />

export default ProfilePage
