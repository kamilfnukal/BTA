import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { YEAR_OFFSET } from '../../const'
import { getBrnoBikeAccidents } from '../../hooks/accidents'
import { getPrecipitation, getTemperature } from '../../hooks/weather'
import { HomeModule, ProtectedModule } from '../../modules'
import { HomePageProps } from '../../types'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../../types/api'

const filterWeatherByDate = (weatherResponse: WeatherTemperatureResponse, month: number, date: number) => {
  return weatherResponse[month][date]
}

const filerAccidentsByDate = (
  accidentsResponse: BrnoBikeAccidentsResponse,
  month: number,
  date: number,
  year: number
) => {
  return accidentsResponse.filter(
    ({ attributes: { den, mesic, rok } }) => den === date && mesic === month && rok === year
  )
}

// TODO: useEffect that checks if needing revalidate (current rendered day stored in firestore)
const HomePage: NextPage<HomePageProps> = (props) => {
  // TODO: extract this useEffect to src/hooks
  useEffect(() => {
    // TODO:
    // Fetch from firestoreDB, when was home page last time revalidated
    // if today, do not do anything
    // if `before today`, we need to revalidate it by calling
    // `fetch(`/api/revalidate?page=home&secret=${process.env.NEXT_PUBLIC_SECRET}`)`
  }, [])

  return (
    <ProtectedModule>
      <HomeModule {...props} />
    </ProtectedModule>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const now = new Date()
  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)
  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)

  const [temperatureToday, precipicationToday, accidents] = await Promise.all([
    await getTemperature(now.getFullYear() - YEAR_OFFSET),
    await getPrecipitation(yesterday.getFullYear() - YEAR_OFFSET),
    await getBrnoBikeAccidents()
  ])

  const temperatureYesterday =
    yesterday.getFullYear() == now.getFullYear()
      ? temperatureToday
      : await getTemperature(yesterday.getFullYear() - YEAR_OFFSET)
  const temperatureTomorrow =
    tomorrow.getFullYear() == now.getFullYear()
      ? temperatureToday
      : await getTemperature(tomorrow.getFullYear() - YEAR_OFFSET)
  const precipacationYesterday =
    yesterday.getFullYear() == now.getFullYear()
      ? precipicationToday
      : await getPrecipitation(yesterday.getFullYear() - YEAR_OFFSET)
  const precipitationTomorrow =
    tomorrow.getFullYear() == now.getFullYear()
      ? precipicationToday
      : await getPrecipitation(tomorrow.getFullYear() - YEAR_OFFSET)

  return {
    props: {
      yesterday: {
        temperature: filterWeatherByDate(temperatureYesterday, yesterday.getMonth(), yesterday.getDate()),
        precipitation: filterWeatherByDate(precipacationYesterday, yesterday.getMonth(), yesterday.getDate()),
        accidents: filerAccidentsByDate(
          accidents,
          yesterday.getMonth(),
          yesterday.getDate(),
          yesterday.getFullYear() - YEAR_OFFSET
        )
      },
      today: {
        temperature: filterWeatherByDate(temperatureToday, now.getMonth(), now.getDate()),
        precipitation: filterWeatherByDate(precipicationToday, now.getMonth(), now.getDate()),
        accidents: filerAccidentsByDate(accidents, now.getMonth(), now.getDate(), now.getFullYear() - YEAR_OFFSET)
      },
      tomorrow: {
        temperature: filterWeatherByDate(temperatureTomorrow, tomorrow.getMonth(), tomorrow.getDate()),
        precipitation: filterWeatherByDate(precipitationTomorrow, tomorrow.getMonth(), tomorrow.getDate()),
        accidents: filerAccidentsByDate(
          accidents,
          tomorrow.getMonth(),
          tomorrow.getDate(),
          tomorrow.getFullYear() - YEAR_OFFSET
        )
      }
    }
  }
}

export default HomePage
