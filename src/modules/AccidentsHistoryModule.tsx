import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { Calendar, Search } from 'react-feather'
import { useAuth } from '../hooks/auth'
import { BrnoBikeAccidentsResponse } from '../types/api'

type TableDay = {
  date: Date
  temperature: number | string
  forecast: string
  accidentsCount: number
}

type TableProps = {
  days: TableDay[] | [TableDay] // Should always be 7 or 1
}

const Table: React.FC<TableProps> = ({ days }) => {
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
            <th>Temperature</th>
            <th>Forecast</th>
            <th>Accidents count</th>
          </tr>
        </thead>
        <tbody className="">
          {/* TODO: map days */}
          <tr>
            <th>28</th>
            <td>Cy Ganderton</td>
            <td>Specialist</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>29</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>30</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>1.12.</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>2.</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

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
            <div className="bg-red-800 mt-8">{query}</div>
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
            <Table days={[]} />
          </Transition>
        </>
      )}
    </div>
  )
}

export { AccidentsHistoryModule }
