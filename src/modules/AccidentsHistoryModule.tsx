import React, { memo, useMemo, useState } from 'react'
import { Calendar, Search } from 'react-feather'
import { useTemperature } from '../hooks/weather'
import { BrnoBikeAccidentsResponse, WeatherTemperatureResponse } from '../types/api'

import { BaseIconInput, BaseSelect, Button, CustomTransition } from '../components/atoms'
import moment from 'moment'
import { YEAR_OFFSET } from '../const'
import { filterAccidents, getWeeks } from '../utils'
import { AccidentCard, WithAccidentModal } from '../components/organisms'
import { Formik, useFormikContext } from 'formik'

type TableDay = {
  date: Date
  accidents: BrnoBikeAccidentsResponse
}

type TableProps = {
  accidents: BrnoBikeAccidentsResponse
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

const Table: React.FC<TableProps> = ({ accidents }) => {
  const {
    values: { day, week }
  } = useFormikContext<typeof INITIAL_VALUES>()

  const filteredDays = useMemo(() => {
    if (day) {
      const fitleredAccidents = getDayAccidents(accidents, day)
      return [{ date: day, accidents: fitleredAccidents }]
    }

    return weeks[week!].map((date) => ({ date, accidents: getDayAccidents(accidents, date) }))
  }, [week, day])

  return (
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
          {filteredDays.map((day) => (
            <TableRow {...day} />
          ))}
        </tbody>
      </table>
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

const INITIAL_VALUES: {
  query: string
  week: number | null
  day: Date | null
} = {
  query: '',
  week: null,
  day: new Date()
}

const AccidentCardsSection: React.FC<{ accidents: BrnoBikeAccidentsResponse }> = ({ accidents }) => {
  const {
    values: { query }
  } = useFormikContext<typeof INITIAL_VALUES>()

  const queriedAccidents = useMemo(() => {
    if (query.length < 3) return []

    return filterAccidents(accidents, query).slice(0, 6)
  }, [query])

  return (
    <div className="flex gap-y-4 flex-wrap w-full -ml-4">
      {queriedAccidents.map((accident) => (
        <AccidentCard accident={accident} />
      ))}
    </div>
  )
}

type TableToolbarProps = TableProps & { week: number | null; setFieldValue: (fieldName: string, value: any) => void }

const TableToolbar = memo(({ accidents, week, setFieldValue }: TableToolbarProps) => (
  <div className="flex mb-14 space-x-10 text-base">
    <div className="bg-gradient-to-br from-lighterpink/80 to-lightpink rounded-lg py-2 px-4 flex space-x-4 font-medium items-center">
      <Calendar />
      <span>{moment().format('Do MMMM')}</span>
    </div>

    <div className="flex space-x-4 items-center grow">
      <BaseSelect
        fieldName="week"
        options={weeks.map((_, i) => ({ id: i, name: formatWeekRange(i) }))}
        getValue={() => (week ? formatWeekRange(week) : 'Select week')}
      />

      <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg bg-white px-4 py-2 shadow">
        <Calendar />
        <input
          type="date"
          onChange={(e) => {
            setFieldValue('day', new Date(e.target.value))
          }}
          defaultValue={new Date().toISOString().substring(0, 10)}
        />
      </div>

      <BaseIconInput
        id="query"
        extraWrapperClasses="grow"
        onChange={(e) => setFieldValue('query', e.target.value)}
        placeholder="Search accident..."
        Icon={Search}
        note={
          <>
            <span>Search in all </span>
            <span className="text-blue-800">{accidents.length} </span>
            <span>accidents</span>
          </>
        }
      />
    </div>
  </div>
))

const AccidentsHistoryModule: React.FC<Props> = ({ data }) => {
  const [showTable, setShowTable] = useState(true)

  return (
    <div className="container mx-auto px-10">
      <Formik initialValues={INITIAL_VALUES} onSubmit={() => undefined}>
        {({ values: { query, week }, setFieldValue }) => (
          <>
            <TableToolbar accidents={data} setFieldValue={setFieldValue} week={week} />
            <CustomTransition show={query.length > 2 && !showTable} afterLeave={() => setShowTable((v) => !v)}>
              <AccidentCardsSection accidents={data} />
            </CustomTransition>
            <CustomTransition show={query.length < 3 && showTable} afterLeave={() => setShowTable((v) => !v)}>
              <Table accidents={data} />
            </CustomTransition>
          </>
        )}
      </Formik>
    </div>
  )
}

export { AccidentsHistoryModule }
