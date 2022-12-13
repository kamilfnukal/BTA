import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Navigation } from 'react-feather'
import { LabeledInput, MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID } from '../const'
import { useCreateRecentlySearched } from '../hooks/planTrip'

const PlanTripModule: React.FC = () => {
  // TODO: read query parameters -- if they're there, pre-fill search fields and show route
  const router = useRouter()
  const { data: session } = useSession()
  const { mutate: createRecentlySearched } = useCreateRecentlySearched()

  const onSearch = () => {
    createRecentlySearched(
      {
        from: {
          lat: 49.209,
          lng: 16.635,
          name: 'Brno - Veveří'
        },
        to: {
          lat: 49.209,
          lng: 16.635,
          name: 'Brno - Ponava'
        },
        userEmail: session?.user?.email ?? ''
      },
      {
        onSuccess: () => {
          console.log('Sucessfully submitted recentlySearched')
        }
      }
    )
  }

  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} Icon={Navigation} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} Icon={Navigation} />

        <div className="w-full flex justify-end mt-6">
          {/* TODO: to be removed since path is displayed dynamically */}
          {/* TODO: change coordinates to selected places */}
          <button onClick={onSearch} className="rounded shadow-lg bg-lighterblue/50 px-4 py-2 hover:bg-lighterblue">
            Show the best route!
          </button>
        </div>
      </div>

      <div className="grow">
        <MapyczMap />
      </div>
    </div>
  )
}

export { PlanTripModule }
