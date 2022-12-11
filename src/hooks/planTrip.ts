import { deleteDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Coord } from '../types'
import {
  RecentlySearchedTrips,
  recentlySearchedTripsDocumentById,
  recentlySearchedTripsDocument,
  recentlySearchedTripsCollection
} from '../utils/firebase'

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
  const recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng
  )

  const idToBeUpdated = recentlySearchedByFromAndTo[0].id
  await deleteDoc(recentlySearchedTripsDocumentById(idToBeUpdated))
}

const createRecentlySearched = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord) => {
  /* TODO: filter also by userId (also in other 2 methods) */
  const recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
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

export const usePlanTripFirebase = () => {
  const [recentlySearchedTrips, setrecentlySearchedTrips] = useState<RecentlySearchedTrips[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(recentlySearchedTripsCollection, (snapshot) => {
      setrecentlySearchedTrips(snapshot.docs.map((doc) => doc.data()))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    recentlySearchedTrips,
    createRecentlySearched,
    deleteRecentlySearchedTrip,
    updatePin
  }
}
