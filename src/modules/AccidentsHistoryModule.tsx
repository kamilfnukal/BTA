import Image from 'next/image'
import { Fragment, useMemo, useState } from 'react'
import { ArrowRight, Calendar, Search } from 'react-feather'
import { useTemperature } from '../hooks/weather'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../types/api'
import DUMMY_BIKE from '../../public/Blue-bike.svg'
import { BaseIconInput, Button, CustomTransition } from '../components/atoms'
import { Listbox, Transition } from '@headlessui/react'
import moment from 'moment'
import { YEAR_OFFSET } from '../const'
import { getWeeks } from '../utils'
import { AccidentDetailModal } from '../components/organisms'

type TableDay = {
  date: Date
  accidents: BrnoBikeAccidentsResponse
}

type TableProps = {
  days: TableDay[] | [TableDay] // Should always be 7 or 1
}

const getTemperatrue = (date: Date, temperatureData?: WeatherTemperatureResponse) => {
  const month = date.getMonth()
  const d = date.getDate()

  return temperatureData?.find((data) => data.month === month + 1)?.[d] ?? 'Loading'
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

const TableRow: React.FC<TableDay> = ({ date, accidents }) => {
  const [isAccidentOpened, setIsAccidentOpened] = useState(false)
  const { data: temp } = useTemperature()

  const temperature = getTemperatrue(date, temp)

  return (
    <tr>
      <th>{date.toLocaleDateString()}</th>
      <td>{temperature}</td>
      <td>{getForecast(temperature, accidents.length)}</td>
      <td className="flex justify-between items-center pr-10">
        <div>{accidents.length}</div>
        {accidents.length > 0 && (
          <>
            <Button
              extraClasses="bg-lighterblue text-black px-3 py-1.5 rounded-lg min-h-0 h-auto border-none text-xs hover:bg-lightblue"
              label="Detail"
              onClick={() => setIsAccidentOpened(true)}
            />
            <AccidentDetailModal
              accident={accidents[0].attributes}
              isOpen={isAccidentOpened}
              closeModal={() => setIsAccidentOpened(false)}
            />
          </>
        )}
      </td>
    </tr>
  )
}

const Table: React.FC<TableProps> = ({ days }) => (
  <div className="overflow-x-auto shadow-md">
    <table className="table table-zebra w-full">
      <thead className="[&>tr>th]:bg-lightpink">
        <tr>
          <th className="flex items-center space-x-2 z-10">
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
        {days.map((day) => (
          <TableRow {...day} />
        ))}
      </tbody>
    </table>
  </div>
)

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

const getDayAccidents = (accidents: BrnoBikeAccidentsResponse, date: Date) =>
  accidents.filter(({ attributes: { datum } }) => {
    const accidentDate = new Date(0)

    // field `datum` is represented as miliseconds from epocha
    accidentDate.setMilliseconds(datum)
    return moment(date).isSame(accidentDate, 'day')
  })

const weeks = getWeeks(new Date().getFullYear() - YEAR_OFFSET)

const formatWeekRange = (weekIndex: number) =>
  weeks[weekIndex]
    .filter((_, i) => i === 0 || i === weeks[weekIndex].length - 1)
    .map((date) => new Intl.DateTimeFormat('en-US').format(date))
    .join(' - ')

type Props = {
  data: BrnoBikeAccidentsResponse
}

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState('')
  const [showTable, setShowTable] = useState(true)

  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())

  const filteredDays = useMemo(() => {
    if (selectedDay) {
      const accidents = getDayAccidents(data, selectedDay)
      return [{ date: selectedDay, accidents }]
    }

    return weeks[selectedWeekIndex!].map((date) => ({ date, accidents: getDayAccidents(data, date) }))
  }, [selectedDay, selectedWeekIndex])

  return (
    <div className="container mx-auto px-10">
      <div className="flex mb-14 space-x-10 text-base">
        <div className="bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 flex space-x-4 font-medium items-center">
          <Calendar />
          <span>{moment().format('Do MMMM')}</span>
        </div>

        <div className="flex space-x-4 items-center grow">
          <Listbox
            value={selectedWeekIndex}
            onChange={(v) => {
              setSelectedWeekIndex(v)
              setSelectedDay(undefined)
            }}
          >
            <div>
              <Listbox.Button className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white pl-4 py-2 shadow">
                <Calendar />

                <span className="block truncate">
                  {selectedWeekIndex !== null ? formatWeekRange(selectedWeekIndex) : 'Select week'}
                </span>
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
                  {weeks.map((_, weekIndex) => (
                    <Listbox.Option
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-5 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={weekIndex}
                    >
                      {formatWeekRange(weekIndex)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white px-4 py-2 shadow">
            <Calendar />
            <input
              type="date"
              onChange={(e) => {
                setSelectedDay(new Date(e.target.value))
                setSelectedWeekIndex(null)
              }}
              defaultValue={new Date().toISOString().substring(0, 10)}
            ></input>
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
        <Table days={filteredDays} />
      </CustomTransition>
    </div>
  )
}

export { AccidentsHistoryModule }
