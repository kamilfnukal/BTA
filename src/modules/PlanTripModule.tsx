import { Navigation } from 'react-feather'
import { BaseIconInput } from '../components/atoms'
import { MapyczMap } from '../components/molecules'
import { END_AT_INPUT_ID, START_FROM_INPUT_ID } from '../const'
import { setDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore'
import {
  RecentlySearchedTrips,
  recentlySearchedTripsCollection,
  recentlySearchedTripsDocument,
  recentlySearchedTripsDocumentById
} from '../utils/firebase'
import { useEffect, useState } from 'react'
import { Coord } from '../types'

type LabeledInputProps = {
  id: string
  label: string
  placeholder: string
}

const createRecentlySearched = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord) => {
  /* TODO: filter also by userId (also in other 2 methods) */
  var recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng
  )

  if (recentlySearchedByFromAndTo.length === 0) {
    const newDocRef = recentlySearchedTripsDocument

    await setDoc(newDocRef, {
      id: newDocRef.id,
      from: from,
      to: to,
      searchedOn: new Date(),
      pinned: false,
      /* TODO: set logged in user id */
      userId: 'temp'
    })
  } else {
    const idToBeUpdated = recentlySearchedByFromAndTo[0].id

    const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
    await updateDoc(documentRef, {
      searchedOn: new Date()
    })
  }
}

const updatePin = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord) => {
  var recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng
  )

  const idToBeUpdated = recentlySearchedByFromAndTo[0].id
  const pinned = recentlySearchedByFromAndTo[0].pinned

  const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
  await updateDoc(documentRef, {
    pinned: !pinned
  })
}

const deleteRecentlySearchedTrip = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord) => {
  var recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng
  )

  const idToBeUpdated = recentlySearchedByFromAndTo[0].id
  await deleteDoc(recentlySearchedTripsDocumentById(idToBeUpdated))
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...inputProps }) => {
  return (
    <div className="pt-4 flex flex-col lg:flex-row lg:items-center w-full">
      <div className="lg:w-1/4 mb-2 lg:mb-0">
        <span className="text-xs xl:text-base px-4 py-2 bg-lighterpink text-blue-800 rounded-xl">{label}</span>
      </div>
      <BaseIconInput Icon={Navigation} extraWrapperClasses="grow" {...inputProps} />
    </div>
  )
}

const PlanTripModule: React.FC = () => {
  const [recentlySearchedTrips, setrecentlySearchedTrips] = useState<RecentlySearchedTrips[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(recentlySearchedTripsCollection, (snapshot) => {
      setrecentlySearchedTrips(snapshot.docs.map((doc) => doc.data()))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="flex -mt-10 3xl:container 3xl:mx-auto w-full grow">
      <div className="w-5/12 flex flex-col px-10">
        <h1 className="text-5xl font-bold text-blue-800 pt-10 pb-20 whitespace-nowrap">Plan your next trip!</h1>

        <LabeledInput label="Start from" placeholder="Brno - Veveří" id={START_FROM_INPUT_ID} />
        <LabeledInput label="End of trip" placeholder="Brno - Botanická" id={END_AT_INPUT_ID} />

        <div className="w-full flex justify-end mt-6">
          {/* TODO: to be removed since path is displayed dynamically */}
          {/* TODO: change coordinates to selected places */}
          <button
            onClick={(_) =>
              createRecentlySearched(
                recentlySearchedTrips,
                {
                  lat: 49.209,
                  lng: 16.635
                },
                {
                  lat: 49.209,
                  lng: 16.635
                }
              )
            }
            className="rounded shadow-lg bg-lighterblue/50 px-4 py-2 hover:bg-lighterblue"
          >
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
