import Image from 'next/image'
import { Fragment, useState } from 'react'
import { ArrowRight, Calendar, Search } from 'react-feather'
import { useTemperature } from '../hooks/weather'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../types/api'
import DUMMY_BIKE from '../../public/Blue-bike.svg'
import { BaseIconInput, CustomTransition } from '../components/atoms'
import { Listbox, Transition } from '@headlessui/react'

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

function getWeeks(year: number): Date[][] {
  // Create Date objects for the first and last days of the year
  const firstDayOfYear = new Date(year, 0, 1)
  const lastDayOfYear = new Date(year, 11, 31)
  const firstDay = new Date(
    firstDayOfYear.getTime() + 86400000 * (1 - (firstDayOfYear.getDay() == 0 ? 7 : firstDayOfYear.getDay()))
  )
  const lastDay = new Date(
    lastDayOfYear.getTime() + 86400000 * (7 - (lastDayOfYear.getDay() == 0 ? 7 : lastDayOfYear.getDay()))
  )

  // Initialize an empty array of weeks, which will be populated with arrays of dates
  const weeks: Date[][] = []

  // Create a variable for the current week, which will be reset each time a new week is started
  let currentWeek: Date[] = []

  // Set the current date to the first day of the year
  let currentDate = firstDay

  // Loop through each day of the year until we reach the last day
  while (currentDate <= lastDay) {
    // Add the current date to the current week
    if (currentDate.getDay() === 1 || currentDate.getDay() === 0) {
      currentWeek.push(currentDate)
    }

    // If the current day is a Saturday (day 6 in the Date object),
    // push the current week to the weeks array and reset the current week
    if (currentDate.getDay() === 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    // Move to the next day by adding one day's worth of milliseconds (86400000) to the current date
    currentDate = new Date(currentDate.getTime() + 86400000)
  }

  // If there are any remaining days in the current week after the loop ends,
  // push that array to the weeks array
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  // Return the weeks array
  return weeks
}

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState('')
  const [showTable, setShowTable] = useState(true)
  const weeks = getWeeks(new Date().getFullYear())
  const [selected, setSelected] = useState(undefined)

  return (
    <div className="container mx-auto px-10">
      <>
        <div className="flex mb-14 space-x-10 text-base">
          <div className="bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 flex space-x-4 font-medium items-center">
            <Calendar />
            {/* TODO: Todays date */}
            <span>17th November</span>
          </div>

          <div className="flex space-x-4 items-center grow">
            <Listbox value={selected} onChange={setSelected}>
              <div>
                <Listbox.Button
                  className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white pl-4 py-2 shadow"
                  style={{ width: '500', paddingRight: selected ? '15px' : '85px' }}
                >
                  <Calendar />
                  <span className="block truncate">{selected ? selected : 'Select week'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    style={{ zIndex: '1000' }}
                  >
                    {weeks.map((week) => (
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-5 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={week.map((date) => new Intl.DateTimeFormat('en-US').format(date)).join(' - ')}
                      >
                        {week.map((date) => new Intl.DateTimeFormat('en-US').format(date)).join(' - ')}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white px-4 py-2 shadow">
              <Calendar />
              <input type="date" defaultValue={new Date().toISOString().substring(0, 10)}></input>
            </div>

            <BaseIconInput
              id="accident-query"
              extraWrapperClasses="grow"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accident..."
              Icon={Search}
              note={
                <>
                  <span>Search in all </span>
                  <span className="text-blue-800">{data.length} </span>
                  <span>accidents</span>
                </>
              }
            />
          </div>
        </div>

        <CustomTransition show={!!query && !showTable} afterLeave={() => setShowTable((v) => !v)}>
          {/* TODO: Found accidents view */}
          <div className="mt-12 flex gap-y-4 flex-wrap w-full -ml-4">
            {[1, 2, 3, 4].map((v) => (
              <Accident date={new Date()} info={{} as BrnoBikeAccidentsResponse[0]} />
            ))}
          </div>
        </CustomTransition>
        <CustomTransition show={!query && showTable} afterLeave={() => setShowTable((v) => !v)}>
          {/* TODO: Change mock */}
          <Table days={DAYS_MOCK} />
        </CustomTransition>
      </>
    </div>
  )
}

export { AccidentsHistoryModule }
