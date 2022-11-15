import { NextPage } from 'next'
import { AccidentsHistoryModule, ProtectedModule } from '../../../modules'

const AccidentsHistoryPage: NextPage = () => <ProtectedModule Module={AccidentsHistoryModule} />

export default AccidentsHistoryPage
