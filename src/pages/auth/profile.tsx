import { GetStaticProps, NextPage } from 'next'
import { getAllLocations } from '../../hooks/location'
import { ProfileModule, ProtectedModule } from '../../modules'
import { Location } from '../../utils/firebase'

const ProfilePage: NextPage<{ definedLocations: Location[] }> = (props) => (
  <ProtectedModule>
    <ProfileModule {...props} />
  </ProtectedModule>
)

export const getStaticProps: GetStaticProps = async (props) => {
  return {
    props: {
      definedLocations: await getAllLocations()
    }
  }
}

export default ProfilePage
