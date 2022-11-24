import { GetStaticProps, NextPage } from 'next'
import { YEAR_OFFSET } from '../../const'
import { getPrecipitation, getTemperature } from '../../hooks/weather'
import { HomeModule, ProtectedModule } from '../../modules'
import { HomePageProps } from '../../types'
import { WeatherTemperatureResponse } from '../../types/api'

const filterByDate = (weatherResponse: WeatherTemperatureResponse, month: number, date: number) => {
  return weatherResponse[month][date]
}

// TODO: useEffect that checks if needing revalidate (current rendered day stored in firestore)
const HomePage: NextPage<HomePageProps> = (props) => (
  <ProtectedModule>
    <HomeModule {...props} />
  </ProtectedModule>
)

export const getStaticProps: GetStaticProps = async () => {
  const now = new Date()
  const year = now.getFullYear() - YEAR_OFFSET

  const [temperature, precipitation] = await Promise.all([await getTemperature(year), await getPrecipitation(year)])

  return {
    props: {
      yesterday: {
        temperature: filterByDate(temperature, now.getMonth(), now.getDate() - 1),
        precipitation: filterByDate(temperature, now.getMonth(), now.getDate() - 1)
      },
      today: {
        temperature: filterByDate(temperature, now.getMonth(), now.getDate()),
        precipitation: filterByDate(temperature, now.getMonth(), now.getDate())
      },
      tomorrow: {
        temperature: filterByDate(temperature, now.getMonth(), now.getDate() + 1),
        precipitation: filterByDate(temperature, now.getMonth(), now.getDate() + 1)
      }
    }
  }
}

export default HomePage
