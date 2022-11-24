import { useMemo } from 'react'
import { Calendar } from 'react-feather'
import { HomeDayCard } from '../components/molecules'
import { useBrnoBikeAccidents } from '../hooks/accidents'
import { useAuth } from '../hooks/auth'
import { HomePageProps } from '../types'

const HomeModule: React.FC<HomePageProps> = ({ yesterday, today, tomorrow }) => {
  const { isLoading, user } = useAuth()

  const { data: accidents } = useBrnoBikeAccidents()

  // TODO to getStaticProps
  const { yesterdayAccidents, todayAccidents, tomorrowAccidents } = useMemo(() => {
    if (!accidents) return { yesterdayAccidents: null, todayAccidents: null, tomorrowAccidents: null }

    const now = new Date()
    return {
      yesterdayAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() - 1 && mesic === now.getMonth() && rok === now.getFullYear()
      ),
      todayAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() && mesic === now.getMonth() && rok === now.getFullYear()
      ),
      tomorrowAccidents: accidents.filter(
        ({ attributes: { den, mesic, rok } }) =>
          den === now.getDate() + 1 && mesic === now.getMonth() && rok === now.getFullYear()
      )
    }
  }, [accidents])

  return (
    <div>
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <div className="container lg:px-10 flex flex-col w-full mx-auto relative">
          <div className="absolute bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 -top-4 flex space-x-4 font-medium">
            <Calendar />
            {/* TODO: Today's date */}
            <span>17th November</span>
          </div>

          <div className="flex justify-center w-full">
            <h1 className="text-5xl pb-10 font-bold">Today</h1>
          </div>

          <div className="flex w-full space-x-20">
            <HomeDayCard {...yesterday} title="Yesterday" accidents={yesterdayAccidents} />
            <HomeDayCard {...today} accidents={todayAccidents} />
            <HomeDayCard {...tomorrow} title="Tomorrow" accidents={tomorrowAccidents} />
          </div>
        </div>
      )}
    </div>
  )
}

export { HomeModule }
