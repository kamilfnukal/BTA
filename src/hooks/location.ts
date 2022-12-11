import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { DefinedLocation, UserLocation } from '../types/api'

import CITY from '../../public/city4.jpeg'

const removeUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: number }) => {
  // TODO: Fetch user's location from firebase. Then remove the one with `locationId`
}

export const useRemoveUserLocation = () => {
  return useMutation(removeUserLocation)
}

const getUserLocation = async (userEmail: string | null | undefined) => {
  // TODO: Fetch user's locations from firebase

  const USER_LOCATIONS_MOCK: UserLocation[] = [
    { locationId: 1, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Veveří', image: CITY, note: 'Home' },
    { locationId: 2, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Ponava', image: CITY, note: 'Uni' },
    { locationId: 3, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Střed', image: CITY, note: 'Work' },
    { locationId: 4, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Hlavní Nádraží', image: CITY }
  ]

  return USER_LOCATIONS_MOCK
}

export const useUserLocation = () => {
  const { data } = useSession()
  return useQuery(['user-location', data?.user?.email], () => getUserLocation(data?.user?.email), {
    // staleTime: 60 * 60
  })
}

const addUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: number }) => {
  // TODO: Fetch user's location from firebase. Then add the one with `locationId`
  // TODO: Add user location to firebase
}

export const useAddUserLocation = () => {
  return useMutation(addUserLocation)
}

export const getAllLocations = async () => {
  // TODO: Fetch all locations from Firebase
  // No onSnapshot, but fetch once somehow - these will not change

  const LOCATIONS_MOCK: DefinedLocation[] = [
    { locationId: 1, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Veveří', image: CITY },
    { locationId: 2, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Ponava', image: CITY },
    { locationId: 3, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Střed', image: CITY },
    { locationId: 4, lng: 48.1201, lat: 16.1201, distance: 0.2, name: 'Brno - Hlavní Nádraží', image: CITY }
  ]

  return LOCATIONS_MOCK
}
