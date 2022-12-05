import { useCallback } from 'react'
import { Calendar } from 'react-feather'
import { HomeDayCard } from '../components/molecules'
import { HomePageProps } from '../types'

const HomeModule: React.FC<HomePageProps> = ({ yesterday, today, tomorrow }) => {
  const getCurrentDate = useCallback(() => {
    const t = new Date('2020-12-28').toLocaleString('en-us', { month: 'long', day: 'numeric' })
    return t
  }, [])

  return (
    <div>
      <div className="container lg:px-10 flex flex-col w-full mx-auto relative">
        <div className="absolute bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 -top-4 flex space-x-4 font-medium">
          <Calendar />
          <span>{ getCurrentDate() }</span>
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
