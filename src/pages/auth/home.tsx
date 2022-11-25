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
  const year = now.getFullYear() - YEAR_OFFSET
  const month = now.getMonth()
  const date = now.getDate()

  const [temperature, precipitation, accidents] = await Promise.all([
    await getTemperature(year),
    await getPrecipitation(year),
    await getBrnoBikeAccidents()
  ])

  // TODO: fix yesterday and tomorrow
  return {
    props: {
      yesterday: {
        temperature: filterWeatherByDate(temperature, month, date - 1),
        precipitation: filterWeatherByDate(precipitation, month, date - 1),
        accidents: filerAccidentsByDate(accidents, month, date - 1, year)
      },
      today: {
        temperature: filterWeatherByDate(temperature, month, date),
        precipitation: filterWeatherByDate(precipitation, month, date),
        accidents: filerAccidentsByDate(accidents, month, date, year)
      },
      tomorrow: {
        temperature: filterWeatherByDate(temperature, month, date + 1),
        precipitation: filterWeatherByDate(precipitation, month, date + 1),
        accidents: filerAccidentsByDate(accidents, month, date + 1, year)
      }
    }
  }
}

export default HomePage
