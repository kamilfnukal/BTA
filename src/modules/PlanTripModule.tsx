import { Form, Formik, useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { useRef, useMemo, useState, useCallback } from 'react'
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

type AccidentDetailLineProps = {
  title: string
  value: string
}

const AccidentDetailLine: React.FC<AccidentDetailLineProps> = ({ title, value }) => {
  return (
    <div className="flex items-center space-x-4 justify-between">
      <h3 className="text-lg text-black/50 whitespace-nowrap">{title}: </h3>
      <div className="px-3 py-[2px] bg-lighterpink rounded">{value}</div>
    </div>
  )
}

type AccidentDetailProps = {
  accident: PlanTripPageProps['locationAccidents'][0][0]
}

const AccidentDetail: React.FC<AccidentDetailProps> = ({ accident }) => {
  const date = new Date(0)
  date.setMilliseconds(accident.datum)

  return (
    <div className="shadow-md border border-lighterblue my-8 p-4 rounded flex flex-col space-y-3 justify-center">
      <div className="flex space-x-2 items-baseline mb-2 border-b border-b-blue-800/50 pb-2">
        <h2 className="text-black/50">Detail nehody ze dne</h2>
        <div className="text-xl">{date.toLocaleDateString()}</div>
      </div>

      <AccidentDetailLine title="Místo" value={accident.nazev} />
      <AccidentDetailLine title="Následky" value={accident.nasledek} />
      <AccidentDetailLine title="Srážka" value={accident.srazka} />
      <AccidentDetailLine title="Věková skupina" value={accident.vek_skupina} />
      <AccidentDetailLine title="Zavinění" value={accident.zavineni} />
      <AccidentDetailLine title="Viditelnost" value={accident.viditelnost} />
      <AccidentDetailLine title="Alkohol" value={accident.alkohol} />
      <AccidentDetailLine title="Stav řidiče" value={accident.stav_ridic} />
    </div>
  )
}

const PlanTripModule: React.FC<PlanTripPageProps> = ({ locationAccidents, allLocations }) => {
  // TODO: read query parameters -- if they're there, pre-fill search fields and show route
  const router = useRouter()

  const [selectedAccidentId, setSelectedAccidentId] = useState<string | null>(null)

  const onSelectAccidentId = useCallback((id: string) => {
    setSelectedAccidentId(id)
  }, [])

  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} Icon={Navigation} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} Icon={Navigation} />

        {selectedAccidentId && (
          <AccidentDetail
            accident={
              ([] as typeof locationAccidents[0])
                .concat(...Object.values(locationAccidents))
                .find(({ id }) => id.toString() === selectedAccidentId)!
            }
          />
        )}
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
