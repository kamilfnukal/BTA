import { NextPage } from 'next'
import { PlanTripModule, ProtectedModule } from '../../../modules'

const ReportAccidentPage: NextPage = () => (
  <ProtectedModule>
    <PlanTripModule />
  </ProtectedModule>
)

export default ReportAccidentPage
