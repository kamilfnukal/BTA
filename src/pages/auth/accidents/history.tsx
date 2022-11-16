import { GetStaticProps, NextPage } from 'next'
import { getBrnoBikeAccidents } from '../../../hooks/accidents'
import { AccidentsHistoryModule, ProtectedModule } from '../../../modules'
import { BrnoBikeAccidentsResponse } from '../../../types/api'

const AccidentsHistoryPage: NextPage<{ data: BrnoBikeAccidentsResponse }> = ({ data }) => (
  <ProtectedModule>
    <AccidentsHistoryModule data={data} />
  </ProtectedModule>
)

export const getStaticProps: GetStaticProps = async () => {
  const brnoBikeAccidents = await getBrnoBikeAccidents()

  return {
    props: {
      data: brnoBikeAccidents
    }
  }
}

export default AccidentsHistoryPage
