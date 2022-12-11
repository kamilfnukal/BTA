import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { UserLocation } from '../types/api'

import CITY from '../../public/city4.jpeg'

const removeUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: number }) => {
  // TODO: Remove from firebase
}

export const useRemoveUserLocation = () => {
  return useMutation(removeUserLocation)
}

const getUserLocation = async () => {
  // TODO: Fetch from firebase
  // const response = await axios.get('URL')
  // return response.data

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
  return useQuery(['user-location', data?.user?.email], getUserLocation, {
    staleTime: 60 * 60
  })
}
