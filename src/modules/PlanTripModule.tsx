import { Form, Formik, useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { Navigation } from 'react-feather'
import { BaseSelect } from '../components/atoms'
import { LabeledInput, MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID, YEARS, YEAR_OFFSET } from '../const'
import { PlanTripPageProps } from '../types'
import { Location } from '../utils/firebase'

const INITIAL_VALUES = {
  location: 'ALL',
  year: new Date().getFullYear() - YEAR_OFFSET
}

type MapToolbarProps = {
  allLocations: Location[]
}

const MapToolbar: React.FC<MapToolbarProps> = ({ allLocations }) => {
  const { values } = useFormikContext<typeof INITIAL_VALUES>()

  return (
    <div className="absolute z-10 top-3 left-6 bg-lightblue p-4 rounded-lg shadow-2xl border border-lighterblue flex space-x-4">
      <div className="w-5/12">
        <BaseSelect fieldName="year" options={YEARS.map((y) => ({ id: y, name: y.toString() }))} />
      </div>

      <div className="grow">
        <BaseSelect
          fieldName="location"
          getValue={() => allLocations.find((l) => l.id === values.location)?.name ?? 'ALL'}
          options={allLocations}
          extraButtonClasses="w-72"
        />
      </div>
    </div>
  )
}

const getFilteredLocations = (
  locationAccidents: PlanTripPageProps['locationAccidents'],
  selectedLocationId?: string,
  year?: number
) => {
  const result: PlanTripPageProps['locationAccidents'] = {}

  for (const [location, accidents] of Object.entries(locationAccidents)) {
    if (!selectedLocationId || selectedLocationId === location) {
      result[location] = accidents.filter(({ rok }) => rok === year)
    }
  }

  return result
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
        {({ values }) => {
          const filteredLocationAccidents = getFilteredLocations(
            locationAccidents,
            values.location === 'ALL' ? undefined : values.location,
            values.year
          )

          return (
            <Form className="grow relative">
              <MapToolbar allLocations={allLocations} />
              <MapyczMap locationAccidents={filteredLocationAccidents} />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export { PlanTripModule }
