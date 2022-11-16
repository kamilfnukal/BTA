import { NextPage } from 'next'
import { ReportAccidentModule, ProtectedModule } from '../../../modules'

const ReportAccidentPage: NextPage = () => (
  <ProtectedModule>
    <ReportAccidentModule />
  </ProtectedModule>
)

export default ReportAccidentPage
