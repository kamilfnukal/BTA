import React, { Fragment, useMemo, useState } from 'react'
import { Calendar, Search } from 'react-feather'
import { useTemperature } from '../hooks/weather'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../types/api'

import { BaseIconInput, Button, CustomTransition } from '../components/atoms'
import { Listbox, Transition } from '@headlessui/react'
import moment from 'moment'
import { YEAR_OFFSET } from '../const'
import { filterAccidents, getWeeks } from '../utils'
import { AccidentCard, WithAccidentModal } from '../components/organisms'

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
  const { data: temp } = useTemperature()
  const temperature = getTemperatrue(date, temp)

  return (
    <tr>
      <td>{date.toLocaleDateString()}</td>
      <td>{temperature}</td>
      <td>{getForecast(temperature, accidents.length)}</td>
      <td className="flex justify-between items-center pr-10">
        <div>{accidents.length}</div>
        {accidents.length > 0 && (
          <WithAccidentModal accident={accidents[0].attributes}>
            {(onModalOpen) => (
              <Button
                extraClasses="bg-lighterblue text-black px-3 py-1.5 rounded-lg min-h-0 h-auto border-none text-xs hover:bg-lightblue"
                label="Detail"
                onClick={onModalOpen}
              />
            )}
          </WithAccidentModal>
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
          <th className="flex items-center space-x-2 !z-10">
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

  const queriedAccidents = useMemo(() => {
    if (query.length < 3) return []

    return filterAccidents(data, query).slice(0, 6)
  }, [query])

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
              {/* TODO: replace with Select */}
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

      <CustomTransition show={query.length > 2 && !showTable} afterLeave={() => setShowTable((v) => !v)}>
        <div className="flex gap-y-4 flex-wrap w-full -ml-4">
          {queriedAccidents.map((accident) => (
            <AccidentCard accident={accident} />
          ))}
        </div>
      </CustomTransition>
      <CustomTransition show={query.length < 3 && showTable} afterLeave={() => setShowTable((v) => !v)}>
        <Table days={filteredDays} />
      </CustomTransition>
    </div>
  )
}

export { AccidentsHistoryModule }
