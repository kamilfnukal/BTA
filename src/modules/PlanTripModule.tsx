import { Listbox, Transition } from '@headlessui/react'
import { Form, Formik, useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { ChevronDown, Navigation, Search } from 'react-feather'
import { BaseIconInput } from '../components/atoms'
import { LabeledInput, MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID, YEAR_OFFSET } from '../const'
import { PlanTripPageProps } from '../types'
import { BrnoBikeAccidentsResponse } from '../types/api'

const INITIAL_VALUES = {
  location: 'ALL',
  year: new Date().getFullYear() - YEAR_OFFSET
}

type MapToolbarProps = {}

const MapToolbar: React.FC<MapToolbarProps> = () => {
  const { values, setFieldValue, submitForm } = useFormikContext<typeof INITIAL_VALUES>()

  return (
    <div className="absolute z-10 top-6 left-6 w-1/2 bg-lightblue px-4 py-2 rounded-lg shadow-xl border border-lighterblue">
      <div className="flex w-5/12">
        {/* TODO create reusable Select component */}
        <Listbox
          value={values.year}
          onChange={(year) => {
            setFieldValue('year', year)
            submitForm()
          }}
        >
          <div className="relative">
            <Listbox.Button className="w-full py-2 pr-12 pl-4 border-2 border-gray-200 rounded-lg bg-white shadow appearance-none focus-visible:outline-none relative">
              <span className="block truncate">{values.year}</span>
              <span className="absolute top-3 right-2">
                <ChevronDown size={18} />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                style={{ zIndex: '1000' }}
              >
                {[2012, 2013].map((value) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-5 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={value}
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

const PlanTripModule: React.FC<PlanTripPageProps> = ({ locationAccidents, allLocations }) => {
  // TODO: read query parameters -- if they're there, pre-fill search fields and show route
  const router = useRouter()

  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} Icon={Navigation} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} Icon={Navigation} />
      </div>

      <Formik initialValues={INITIAL_VALUES} onSubmit={(values) => undefined}>
        {({ values, setFieldValue }) => {
          console.log(values)

          const filteredLocations = ([] as BrnoBikeAccidentsResponse)
            .concat(...Object.values(locationAccidents))
            .filter(({ attributes: { rok } }) => {
              return rok === values.year
            })

          console.log(filteredLocations)

          return (
            <Form className="grow relative">
              <MapToolbar />
              <MapyczMap locationAccidents={locationAccidents} allLocations={allLocations} />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export { PlanTripModule }
