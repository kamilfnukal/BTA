import CITY from '../../public/city4.jpeg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { X } from 'react-feather'
import { useRemoveUserLocation, useUserLocation } from '../hooks/location'

const ProfileModule: React.FC = () => {
  const { data } = useSession()
  const { data: userLocations } = useUserLocation()
  const { mutate: removeUserLocation } = useRemoveUserLocation()

  const onRemoveLocation = (locationId: number) => {
    removeUserLocation(
      { userEmail: data?.user?.email ?? '', locationId },
      {
        onSuccess: () => {
          console.log('Location removed successfully')
        }
      }
    )
  }

  return (
    <div className="container mx-auto">
      <div className="bg-lightblue rounded-md shadow-lg relative pb-10">
        <div className="w-full h-52 relative overflow-hidden rounded-t-md">
          <Image src={CITY} alt="" fill />
        </div>

        <div className="absolute h-40 w-40 rounded-full bg-black top-32 left-10">
          {/* Image */}
          <div></div>
        </div>

        <div className="py-8 pl-64">
          <h1 className="text-5xl font-semibold text-gray-800">{data?.user?.name}</h1>
          <p className="text-gray-500 mt-2">{data?.user?.email}</p>
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
                    userLocations.map(({ locationId, lng, lat, distance, name, image, note }) => {
                      return (
                        <div className="shadow-md border border-lighterblue py-3 px-10 rounded-lg flex justify-between">
                          <div className="flex space-x-4">
                            <Image src={image} alt="" className="w-14 h-14 rounded-lg" />
                            <div className="flex flex-col justify-between py-1">
                              <h3 className="text-blue-800 font-semibold text-xl">{name}</h3>
                              <div className="flex space-x-2 text-xs">
                                <span>{lng}</span>
                                <span>&bull;</span>
                                <span>{lat}</span>
                                <span>&bull;</span>
                                <span>{distance}</span>
                              </div>
                            </div>
                          </div>
                          <div className={clsx('flex flex-col', note ? 'justify-between' : 'justify-end')}>
                            {note && (
                              <div className="flex justify-end">
                                <div className="bg-lighterpink px-2 py-1 rounded-lg text-xs">{note}</div>
                              </div>
                            )}
                            <button
                              onClick={() => onRemoveLocation(locationId)}
                              className="flex items-center space-x-2 px-1 py-[2px] hover:text-red-700 hover:underline hover:underline-offset-4 hover:translate-x-3 hover:duration-500 group"
                            >
                              <X size={16} className="group-hover:opacity-50" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
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
