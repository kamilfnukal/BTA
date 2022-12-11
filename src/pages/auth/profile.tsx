import { GetStaticProps, NextPage } from 'next'
import { getAllLocations } from '../../hooks/location'
import { ProfileModule, ProtectedModule } from '../../modules'
import { DefinedLocation } from '../../types/api'

const ProfilePage: NextPage<{ definedLocations: DefinedLocation[] }> = (props) => (
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
