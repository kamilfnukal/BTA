import { NextPage } from 'next'
import { ReportAccidentModule, ProtectedModule } from '../../../modules'

const ReportAccidentPage: NextPage = () => <ProtectedModule Module={ReportAccidentModule} />

export default ReportAccidentPage
