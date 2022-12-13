import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteDoc, addDoc, updateDoc, getDocs } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { Coord } from '../types'
import { recentlySearchedTripsDocumentById, recentlySearchedTripsCollection } from '../utils/firebase'

type RecentlySearchedMutationArgs = {
  from: Coord & { name: string }
  to: Coord & { name: string }
  userEmail: string
}

const getRecentlySearchedTripsByFromTo = async ({ from, to, userEmail }: RecentlySearchedMutationArgs) => {
  return (await getRecentlySearchedTrips(userEmail)).filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng
  )
}

const updatePin = async (args: RecentlySearchedMutationArgs) => {
  const recentlySearchedByFromAndTo = await getRecentlySearchedTripsByFromTo(args)

  const idToBeUpdated = recentlySearchedByFromAndTo[0].id
  const pinned = recentlySearchedByFromAndTo[0].pinned

  const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
  await updateDoc(documentRef, {
    pinned: !pinned
  })
}

export const useUpdateRecentlySearchedPinned = () => {
  return useMutation(updatePin)
}

const deleteRecentlySearchedTrip = async (args: RecentlySearchedMutationArgs) => {
  const recentlySearchedByFromAndTo = await getRecentlySearchedTripsByFromTo(args)

  const idToBeDeleted = recentlySearchedByFromAndTo[0].id
  await deleteDoc(recentlySearchedTripsDocumentById(idToBeDeleted))
}

export const useDeleteRecentlySearched = () => {
  return useMutation(deleteRecentlySearchedTrip)
}

const createRecentlySearched = async (args: RecentlySearchedMutationArgs) => {
  const recentlySearchedByFromAndTo = await getRecentlySearchedTripsByFromTo(args)
  const { from, to, userEmail } = args

  if (recentlySearchedByFromAndTo.length === 0) {
    const newDocRef = await addDoc(recentlySearchedTripsCollection, {
      id: '',
      from: from,
      to: to,
      searchedOn: new Date(),
      pinned: false,
      userEmail: userEmail
    })

    await updateDoc(newDocRef, { id: newDocRef.id })
  } else {
    const idToBeUpdated = recentlySearchedByFromAndTo[0].id

    const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
    await updateDoc(documentRef, {
      searchedOn: new Date()
    })
  }
}

export const useCreateRecentlySearched = () => {
  return useMutation(createRecentlySearched)
}

const getRecentlySearchedTrips = async (userEmail: string) => {
  return (await getDocs(recentlySearchedTripsCollection).then((data) => data.docs.map((x) => x.data()))).filter(
    (x) => x.userEmail === userEmail
  )
}

export const useRecentlySearched = () => {
  const { data: session } = useSession()

  return useQuery(['recentlySearchedTrips'], () => getRecentlySearchedTrips(session?.user?.email ?? ''), {
    staleTime: 60 * 60,
    enabled: !!session
  })
}
