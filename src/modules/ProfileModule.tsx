import CITY from '../../public/city4.jpeg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useAddUserLocation, useRemoveUserLocation, useUserLocations } from '../hooks/location'
import { useCallback, useState } from 'react'
import { LocationCard, RecentlySearchedCard } from '../components/molecules'
import { Plus, Search } from 'react-feather'
import { BaseIconInput, CustomTransition, InputLabel } from '../components/atoms'
import { Location } from '../utils/firebase'
import { useRecentlySearched } from '../hooks/planTrip'

type AddLocationSelectProps = {
  locations: Location[]
}

const AddLocationSelect: React.FC<AddLocationSelectProps> = ({ locations }) => {
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const { mutate: addUserLocation } = useAddUserLocation()
  const { refetch } = useUserLocations()

  const onAddLocation = useCallback(
    (locationId: string) => {
      addUserLocation(
        /* TODO: get note from somewhere */
        { userEmail: session?.user?.email ?? '', locationId, note: 'School' },
        {
          onSuccess: () => {
            refetch()
            setQuery('')
          }
        }
      )
    },
    [addUserLocation, session]
  )

  return (
    <div className="flex items-center space-x-6 w-full z-10">
      <InputLabel label="Add another" />
      <div className="relative w-full">
        <BaseIconInput
          Icon={Search}
          id="all-location-search"
          placeholder="Search for locations..."
          extraWrapperClasses="grow"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <CustomTransition show={query !== ''} afterLeave={() => undefined}>
          <div className="absolute top-12 bg-white w-full rounded py-4 shadow-xl flex flex-col">
            {locations.map(({ name, image, id }) => (
              <button
                onClick={() => onAddLocation(id)}
                className="flex space-x-4 items-center px-4 py-1 hover:bg-lightpurple/50 hover:cursor-pointer group"
              >
                <Image src={image === '' ? CITY : image} width={32} height={32} alt="" className="h-8 w-8 rounded-lg" />
                <span className="text-lg text-left grow">{name}</span>
                <div className="hidden shadow-lg items-center space-x-1 group-hover:flex bg-lighterpink px-2 py-1 rounded-lg text-xs">
                  <Plus size={14} />
                  <span>Add</span>
                </div>
              </button>
            ))}
          </div>
        </CustomTransition>
      </div>
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

const RecentlySearchedLocations = () => {
  const { data: recentlySearchedTrips } = useRecentlySearched()
  const [limit, setLimit] = useState<number | null>(4)

  const onShowMore = useCallback(() => {
    setLimit(null)
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {(recentlySearchedTrips ? (limit ? recentlySearchedTrips.slice(0, limit) : recentlySearchedTrips) : []).map(
          (recentlySearched) => (
            <RecentlySearchedCard {...recentlySearched} />
          )
        )}
      </div>
      {recentlySearchedTrips && recentlySearchedTrips.length > 4 && limit && (
        <button
          onClick={onShowMore}
          className="text-sm mt-3 py-1 border border-lighterblue w-full shadow-md rounded-lg hover:bg-lighterblue/50 hover:border-lighterblue"
        >
          Show more
        </button>
      )}
    </>
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
                  <AddLocationSelect locations={definedLocations} />
                </div>

                <UserPreferredLocations />
              </div>
            </div>

            {/* Right part */}
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold my-6">Recently searched trips</h2>
              <RecentlySearchedLocations />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileModule }
