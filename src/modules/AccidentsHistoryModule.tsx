import { Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Calendar, Search } from 'react-feather'
import { useAuth } from '../hooks/auth'
import { useTemperature } from '../hooks/weather'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../types/api'
import DUMMY_BIKE from '../../public/Blue-bike.svg'

type TableDay = {
  date: Date
  accidentsCount: number
}

type TableProps = {
  days: TableDay[] | [TableDay] // Should always be 7 or 1
}

const getTemperatrue = (date: Date, temperatureData?: WeatherTemperatureResponse) => {
  const month = date.getMonth()
  const d = date.getDate()

  return temperatureData?.find((data) => data.month === month)?.[d] ?? 'Loading'
}

const getForecast = (temperature: number | string, accidentsCount: number) => {
  if (temperature === 'Loading') {
    return 'Loading'
  }

  if (temperature < 5) {
    if (accidentsCount === 0) {
      return "It's gonna be a bit cold, but no accident is expected! ✅"
    }
    return `Don't ride a bike today! ❌ It's cold and will happen ${accidentsCount} accidents.`
  }

  if (accidentsCount === 0) {
    return 'Perfect weather for bike riding today! Totally safe as well, no accident will happen 🔥'
  }

  return `It's not going to be cold, but ${accidentsCount} accidents are expected. Be carefoul! 🙏`
}

const Table: React.FC<TableProps> = ({ days }) => {
  const { data: temp } = useTemperature()

  // TODO: Show selected week OR selected date
  return (
    <div className="overflow-x-auto shadow-md">
      <table className="table table-zebra w-full">
        <thead className="[&>tr>th]:bg-lightpink">
          <tr>
            <th className="flex items-center space-x-2">
              <Calendar size={16} className="inline-block" />
              <span>Date</span>
            </th>
            {/* TODO: icons? */}
            <th>Temperature</th>
            <th>Forecast</th>
            <th>Accidents count</th>
          </tr>
        </thead>
        <tbody>
          {days.map(({ date, accidentsCount }) => {
            const temperature = getTemperatrue(date, temp)
            return (
              <tr>
                <th>{date.toLocaleDateString()}</th>
                <td>{temperature}</td>
                <td>{getForecast(temperature, accidentsCount)}</td>
                {/* TODO: style + "Get details ->" button */}
                <td>{accidentsCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type AccidentProps = {
  date: Date
  info: BrnoBikeAccidentsResponse[0]
}

const Accident: React.FC<AccidentProps> = ({ date, info }) => {
  return (
    <div className="w-1/3">
      <div className="mx-4 bg-gradient-to-tl from-lightblue to-lighterpink/70 p-6 rounded-lg">
        <div className="flex space-x-4">
          <Image src={DUMMY_BIKE} width={54} alt="Shoes" />
          <div>
            <h2 className="font-bold text-blue-800 text-lg">Accident in Brno</h2>
            <div className="flex items-center space-x-2 text-blue-800">
              <Calendar size={14} />
              <div className="text-sm font-light">{date.toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center text-blue-800">
          <h3 className="text-lg font-semibold pl-2">Details</h3>
          <div className="flex space-x-2 items-center rounded-lg px-2 py-1 hover:shadow hover:cursor-pointer">
            <button className="">See more</button>
            <ArrowRight size={14} />
          </div>
        </div>
        {/* TODO: restrict length of description to ?? */}
        <div className="mt-2 py-2 px-4 shadow rounded-lg">
          description description description description description description description
        </div>
      </div>
    </div>
  )
}

const DAYS_MOCK = [
  {
    date: new Date(),
    accidentsCount: 2
  },
  {
    date: new Date('2022-11-26'),
    accidentsCount: 2
  }
]

type Props = {
  data: BrnoBikeAccidentsResponse
}

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const { isLoading } = useAuth()

  const [query, setQuery] = useState('')
  const [showTable, setShowTable] = useState(true)

  return (
    <div className="container mx-auto px-10">
      {isLoading ? (
        <h1 className="text-3xl">Loading</h1>
      ) : (
        <>
          <div className="flex mb-14 space-x-10 text-base">
            <div className="bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 flex space-x-4 font-medium items-center">
              <Calendar />
              {/* TODO: Todays date */}
              <span>17th November</span>
            </div>

            <div className="flex space-x-4 items-center grow">
              {/* TODO: Week picker */}
              <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white px-4 py-2 shadow">
                <Calendar />
                <span>Week picker</span>
              </div>

              {/* TODO: Date picker */}
              <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white px-4 py-2 shadow">
                <Calendar />
                <span>Select day</span>
              </div>

              <div className="grow relative">
                <div className="absolute top-3.5 left-5">
                  <Search size={16} />
                </div>
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search accident..."
                  className="w-full py-2 pl-12 pr-2 border-2 border-gray-200 rounded-lg bg-white shadow appearance-none focus-visible:outline-none"
                />
                <div className="absolute -bottom-5 right-2 text-gray-400 text-xs">
                  <span>Search in all </span>
                  <span className="text-blue-800">{data.length} </span>
                  <span>accidents</span>
                </div>
              </div>
            </div>
          </div>

          {/* TODO: Extract to component -- duplicated code for Trainsition */}
          <Transition
            show={!!query && !showTable}
            afterLeave={() => setShowTable((v) => !v)}
            enter="transition-opacity duration-125"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-125"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* TODO: Found accidents view */}
            <div className="mt-12 flex gap-y-4 flex-wrap w-full -ml-4">
              {[1, 2, 3, 4].map((v) => (
                <Accident date={new Date()} info={{} as BrnoBikeAccidentsResponse[0]} />
              ))}
            </div>
          </Transition>
          <Transition
            show={!query && showTable}
            afterLeave={() => setShowTable((v) => !v)}
            enter="transition-opacity duration-125"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-125"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* TODO: Change mock */}
            <Table days={DAYS_MOCK} />
          </Transition>
        </>
      )}
    </div>
  )
}

export { AccidentsHistoryModule }
