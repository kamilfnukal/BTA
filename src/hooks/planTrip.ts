import { deleteDoc, onSnapshot, addDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Coord } from '../types'
import {
  RecentlySearchedTrips,
  recentlySearchedTripsDocumentById,
  recentlySearchedTripsCollection
} from '../utils/firebase'

const updatePin = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord, userEmail: string) => {
  var recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng && x.userEmail === userEmail
  )

  const idToBeUpdated = recentlySearchedByFromAndTo[0].id
  const pinned = recentlySearchedByFromAndTo[0].pinned

  const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
  await updateDoc(documentRef, {
    pinned: !pinned
  })
}

const deleteRecentlySearchedTrip = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord, userEmail: string) => {
  const recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng && x.userEmail === userEmail
  )

  const idToBeDeleted = recentlySearchedByFromAndTo[0].id
  await deleteDoc(recentlySearchedTripsDocumentById(idToBeDeleted))
}

const createRecentlySearched = async (recentlySearchedTrips: RecentlySearchedTrips[], from: Coord, to: Coord, userEmail: string) => {
  const recentlySearchedByFromAndTo = recentlySearchedTrips.filter(
    (x) => x.from.lat === from.lat && x.from.lng === from.lng && x.to.lat === to.lat && x.to.lng === to.lng && x.userEmail === userEmail
  )

  if (recentlySearchedByFromAndTo.length === 0) {
    const newDocRef = await addDoc(recentlySearchedTripsCollection, {
      id: "",
      from: from,
      to: to,
      searchedOn: new Date(),
      pinned: false,
      userEmail: userEmail
    })

    await updateDoc(newDocRef, {id: newDocRef.id})
  } else {
    const idToBeUpdated = recentlySearchedByFromAndTo[0].id

    const documentRef = recentlySearchedTripsDocumentById(idToBeUpdated)
    await updateDoc(documentRef, {
      searchedOn: new Date()
    })
  }
}

export const usePlanTripFirebase = (userEmail: string) => {
  const [recentlySearchedTrips, setrecentlySearchedTrips] = useState<RecentlySearchedTrips[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(recentlySearchedTripsCollection, (snapshot) => {
      setrecentlySearchedTrips(snapshot.docs.map((doc) => doc.data()).filter(x => x.userEmail === userEmail))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  console.log(recentlySearchedTrips.length)

  return {
    recentlySearchedTrips,
    createRecentlySearched,
    deleteRecentlySearchedTrip,
    updatePin
  }
}
