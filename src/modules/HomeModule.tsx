import { useMemo } from 'react'
import { Calendar } from 'react-feather'
import { HomeDayCard } from '../components/molecules'
import { HomePageProps } from '../types'

const HomeModule: React.FC<HomePageProps> = ({ yesterday, today, tomorrow }) => {
  const getCurrentDate = useMemo(() => {
    const n = new Date().getDay()
    const month = new Date().toLocaleString('en-us', { month: 'long' })

    return (
      n + (n > 3 && n < 21 ? 'th' : n % 10 == 1 ? 'st' : n % 10 == 2 ? 'nd' : n % 10 == 3 ? 'rd' : 'th') + ' ' + month
    )
  }, [])

  return (
    <div>
      <div className="container lg:px-10 flex flex-col w-full mx-auto relative">
        <div className="absolute bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 -top-4 flex space-x-4 font-medium">
          <Calendar />
          <span>{getCurrentDate}</span>
        </div>

        <div className="flex justify-center w-full">
          <h1 className="text-5xl pb-10 font-bold">Today</h1>
        </div>

        <div className="flex w-full space-x-20">
          <HomeDayCard {...yesterday} title="Yesterday" />
          <HomeDayCard {...today} />
          <HomeDayCard {...tomorrow} title="Tomorrow" />
        </div>
      </div>
    </div>
  )
}

export { HomeModule }
