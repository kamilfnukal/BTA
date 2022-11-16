import { NextPage } from 'next'
import { ProfileModule, ProtectedModule } from '../../modules'

const ProfilePage: NextPage = () => (
  <ProtectedModule>
    <ProfileModule />
  </ProtectedModule>
)

export default ProfilePage
