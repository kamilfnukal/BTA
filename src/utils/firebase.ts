import { initializeApp } from 'firebase/app'
import { collection, doc, CollectionReference, DocumentReference, getFirestore } from 'firebase/firestore'
import { Coord } from '../types'

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyAWovbqlGt5iWlODxVXG9jar-D7Kvsz5-w',
  authDomain: 'brno-bike-advisor.firebaseapp.com',
  projectId: 'brno-bike-advisor',
  storageBucket: 'brno-bike-advisor.appspot.com',
  messagingSenderId: '309559427226',
  appId: '1:309559427226:web:a50892c3ff85629239df23'
})

// Firestore
const db = getFirestore()

// Locations collection
export type Location = {
  id: string
  coordinate: Coord
  distance: number
  name: string
  image: string
}

export const locationsCollection = collection(db, 'locations') as CollectionReference<Location>

// UserLocations collection
export type UserLocation = {
  id: string
  userEmail: string
  location: Location
  note: string
}

export const userLocationsCollection = collection(db, 'userLocations') as CollectionReference<UserLocation>

export const userLocationsDocumentById = (id: string) => doc(db, 'userLocations', id) as DocumentReference<UserLocation>

// RecentlySearchedTrips collection
export type RecentlySearchedTrips = {
  id: string
  from: Coord & { name: string }
  to: Coord & { name: string }
  searchedOn: Date
  pinned: boolean
  userEmail: string
}

export const recentlySearchedTripsCollection = collection(
  db,
  'recentlySearchedTrips'
) as CollectionReference<RecentlySearchedTrips>

export const recentlySearchedTripsDocumentById = (id: string) =>
  doc(db, 'recentlySearchedTrips', id) as DocumentReference<RecentlySearchedTrips>
