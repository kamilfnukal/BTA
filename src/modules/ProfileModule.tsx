import CITY from '../../public/city4.jpeg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRemoveUserLocation, useUserLocation } from '../hooks/location'
import { useCallback } from 'react'
import { LocationCard } from '../components/molecules'

const ProfileModule: React.FC = () => {
  const { data: session } = useSession()
  const { data: userLocations } = useUserLocation()
  const { mutate: removeUserLocation } = useRemoveUserLocation()

  const onRemoveLocation = useCallback(
    (locationId: number) => {
      removeUserLocation(
        { userEmail: session?.user?.email ?? '', locationId },
        {
          onSuccess: () => {
            console.log('Location removed successfully')
          }
        }
      )
    },
    [removeUserLocation, session]
  )

  return (
    <div className="container mx-auto">
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
          <div className="flex w-full">
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold my-6">Your preferred locations</h2>
              <div className="flex flex-col">
                <div className="flex">
                  {/* TODO: Add location input - the same view as on "Plan your next trip" */}
                  <span>Add another</span>
                  <input type="text" />
                </div>

                {/* TODO: User's locations map */}
                <div className="mt-4 flex flex-col space-y-2">
                  {userLocations &&
                    userLocations.map((userLocation) => <LocationCard {...userLocation} onRemove={onRemoveLocation} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileModule }
