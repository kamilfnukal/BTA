import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useMemo, useState, useCallback } from 'react'
import { Navigation } from 'react-feather'
import { AccidentDetail, LabeledInput, MapToolbar, MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID, YEAR_OFFSET } from '../const'
import { PlanTripPageProps } from '../types'

const INITIAL_VALUES = {
  location: 'ALL',
  year: new Date().getFullYear() - YEAR_OFFSET
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

  const [selectedAccidentId, setSelectedAccidentId] = useState<string | null>(null)

  const onSelectAccidentId = useCallback((id: string) => {
    setSelectedAccidentId(id)
  }, [])

  const selectedAccident = useMemo(() => {
    if (!selectedAccidentId) return null

    return ([] as typeof locationAccidents[0])
      .concat(...Object.values(locationAccidents))
      .find(({ id }) => id.toString() === selectedAccidentId)!
  }, [])

  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} Icon={Navigation} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} Icon={Navigation} />

        {selectedAccident && <AccidentDetail accident={selectedAccident} />}
      </div>

      <Formik initialValues={INITIAL_VALUES} onSubmit={(values) => undefined}>
        {({ values }) => {
          // Preventing map re-render on marker click
          const filteredLocationAccidents = useMemo(
            () =>
              getFilteredLocations(
                locationAccidents,
                values.location === 'ALL' ? undefined : values.location,
                values.year
              ),
            [values]
          )

          return (
            <Form className="grow relative">
              <MapToolbar allLocations={allLocations} />
              <MapyczMap locationAccidents={filteredLocationAccidents} onMarkerClick={setSelectedAccidentId} />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export { PlanTripModule }
