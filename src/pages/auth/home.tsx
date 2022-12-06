import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { YEAR_OFFSET } from '../../const'
import { getBrnoBikeAccidents } from '../../hooks/accidents'
import { getPrecipitation, getTemperature } from '../../hooks/weather'
import { HomeModule, ProtectedModule } from '../../modules'
import { HomePageProps } from '../../types'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../../types/api'

const filterWeatherByDate = (weatherResponse: WeatherTemperatureResponse, date: Date) => {
  return weatherResponse[date.getMonth()][date.getDate()]
}

const filerAccidentsByDate = (accidentsResponse: BrnoBikeAccidentsResponse, date: Date) => {
  // TODO: fix via `datum`
  return accidentsResponse.filter(
    ({ attributes: { den, mesic, rok } }) =>
      den === date.getDate() && mesic === date.getMonth() && rok === date.getFullYear() - YEAR_OFFSET
  )
}

const isSameYear = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear()

const fetchWeatherDifferentYear = async (date: Date) => {
  const year = date.getFullYear() - YEAR_OFFSET
  return [await getTemperature(year), await getPrecipitation(year)]
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
  const tomorrow = new Date()

  yesterday.setDate(now.getDate() - 1)
  tomorrow.setDate(now.getDate() + 1)

  const [temperatureToday, precipicationToday, accidents] = await Promise.all([
    getTemperature(now.getFullYear() - YEAR_OFFSET),
    getPrecipitation(now.getFullYear() - YEAR_OFFSET),
    getBrnoBikeAccidents()
  ])

  let yesterdayWeather = [temperatureToday, precipicationToday]
  let tomorrowWeather = [temperatureToday, precipicationToday]

  if (!isSameYear(now, yesterday)) {
    yesterdayWeather = await fetchWeatherDifferentYear(yesterday)
  }

  if (!isSameYear(now, tomorrow)) {
    tomorrowWeather = await fetchWeatherDifferentYear(tomorrow)
  }

  return {
    props: {
      yesterday: {
        temperature: filterWeatherByDate(yesterdayWeather[0], yesterday),
        precipitation: filterWeatherByDate(yesterdayWeather[1], yesterday),
        accidents: filerAccidentsByDate(accidents, yesterday)
      },
      today: {
        temperature: filterWeatherByDate(temperatureToday, now),
        precipitation: filterWeatherByDate(precipicationToday, now),
        accidents: filerAccidentsByDate(accidents, now)
      },
      tomorrow: {
        temperature: filterWeatherByDate(tomorrowWeather[0], tomorrow),
        precipitation: filterWeatherByDate(tomorrowWeather[1], tomorrow),
        accidents: filerAccidentsByDate(accidents, tomorrow)
      }
    }
  }
}

export default HomePage
