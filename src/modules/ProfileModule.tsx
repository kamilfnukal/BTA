import CITY from '../../public/city4.jpeg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useAddUserLocation, useRemoveUserLocation, useUserLocations } from '../hooks/location'
import { useCallback } from 'react'
import { LocationCard } from '../components/molecules'
import { Tag } from 'react-feather'
import { BaseIconInput, BaseSelect, Button } from '../components/atoms'
import { Location } from '../utils/firebase'
import { RecentlySearchedSection } from '../components/organisms'
import { Formik } from 'formik'

type AddLocationFormProps = {
  locations: Location[]
}

const INITIAL_VALUES: {
  location: string
  note: string
} = {
  location: '',
  note: ''
}

const AddLocationForm: React.FC<AddLocationFormProps> = ({ locations }) => {
  const { data: session } = useSession()
  const { mutate: addUserLocation } = useAddUserLocation()
  const { refetch } = useUserLocations()

  const onFormSubmit = useCallback(
    ({ location, note }: typeof INITIAL_VALUES, { resetForm }: { resetForm: () => void }) => {
      addUserLocation(
        { userEmail: session?.user?.email ?? '', locationId: location, note },
        {
          onSuccess: () => {
            refetch()
            resetForm()
          }
        }
      )
    },
    [session]
  )

  return (
    <div className="flex items-center space-x-2 w-full z-10 mb-6">
      <Formik initialValues={INITIAL_VALUES} onSubmit={onFormSubmit}>
        {({ values, submitForm, setFieldValue }) => (
          <>
            <BaseSelect
              fieldName="location"
              options={locations.map(({ id, name }) => ({ id, name }))}
              getValue={() =>
                values.location ? (
                  locations.find(({ id }) => id === values.location)?.name ?? ''
                ) : (
                  <span className="text-black/40">'Brno - Lůžánky'</span>
                )
              }
              extraWrapperClasses="grow"
              extraButtonClasses="w-full"
            />

            <BaseIconInput
              id="note"
              onChange={(e) => setFieldValue('note', e.target.value)}
              Icon={Tag}
              value={values.note}
              placeholder="School"
              note={<span className="text-black/50 text-xs">Label your location</span>}
              extraWrapperClasses="w-1/3"
            />

            <Button
              label="Add"
              onClick={submitForm}
              extraClasses="min-h-0 h-auto py-3 shadow-lg bg-blue-800 hover:bg-lighterblue hover:border hover:border-blue-800 hover:text-blue-800"
            />
          </>
        )}
      </Formik>
    </div>
  )
}

const UserPreferredLocations = () => {
  const { data: session } = useSession()
  const { mutate: removeUserLocation } = useRemoveUserLocation()
  const { data: userLocations } = useUserLocations()
  const { refetch } = useUserLocations()

  const onRemoveLocation = useCallback(
    (locationId: string) => {
      removeUserLocation(
        { userEmail: session?.user?.email ?? '', locationId },
        {
          onSuccess: () => {
            refetch()
          }
        }
      )
    },
    [removeUserLocation, session]
  )

  return (
    <div className="mt-4 flex flex-col space-y-4">
      {userLocations &&
        userLocations.map((userLocation) => <LocationCard {...userLocation} onRemove={onRemoveLocation} />)}
    </div>
  )
}

const ProfileModule: React.FC<{ definedLocations: Location[] }> = ({ definedLocations }) => {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto mb-10">
      <div className="bg-lightblue rounded-md shadow-lg relative pb-10">
        <div className="w-full h-52 relative overflow-hidden rounded-t-md">
          <Image src={CITY} alt="" fill />
        </div>

        <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-black to-blue-800 top-32 left-10">
          {/* Image */}
          <div></div>
        </div>

        <div className="py-8 pl-64">
          <h1 className="text-5xl font-semibold text-gray-800">{session?.user?.name}</h1>
          <p className="text-gray-500 mt-2">{session?.user?.email}</p>
        </div>

        <div className="px-20 w-full">
          <div className="flex space-x-20 w-full">
            {/* Left part */}
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold my-6">Your preferred locations</h2>
              <div className="flex flex-col">
                <div className="flex w-full">
                  <AddLocationForm locations={definedLocations} />
                </div>

                <UserPreferredLocations />
              </div>
            </div>

            {/* Right part */}
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold my-6">Recently searched trips</h2>
              <RecentlySearchedSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileModule }
