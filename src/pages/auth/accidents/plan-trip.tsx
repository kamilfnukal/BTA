import { GetStaticProps, NextPage } from 'next'
import { getBrnoBikeAccidents } from '../../../hooks/accidents'
import { getAllLocations } from '../../../hooks/location'
import { PlanTripModule, ProtectedModule } from '../../../modules'
import { PlanTripPageProps } from '../../../types'
import { getAccidentsInLocations } from '../../../utils'

const PlanTripPage: NextPage<PlanTripPageProps> = (props) => (
  <ProtectedModule>
    <PlanTripModule {...props} />
  </ProtectedModule>
)

export const getStaticProps: GetStaticProps = async () => {
  const [accidents, locations] = await Promise.all([getBrnoBikeAccidents(), getAllLocations()])

  return {
    props: {
      locationAccidents: getAccidentsInLocations(accidents, locations)
    }
  }
}

export default PlanTripPage
