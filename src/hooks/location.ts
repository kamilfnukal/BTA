import { useMutation } from '@tanstack/react-query'
import { locationsCollection, userLocationsCollection } from '../utils/firebase'
import { getDocs, addDoc } from '@firebase/firestore'

const removeUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: number }) => {
  // TODO: Fetch user's location from firebase. Then remove the one with `locationId`
}

export const useRemoveUserLocation = () => {
  return useMutation(removeUserLocation)
}

const getUserLocation = async (userEmail: string | null | undefined) => {
  return await getDocs(userLocationsCollection).then(l => l.docs.map(x => x.data()))
}

const addUserLocation = async ({ userEmail, locationId, note }: { userEmail: string; locationId: string, note: string }) => {
  const location = (await getAllLocations()).filter(x => x.id === locationId)[0]
  const userLocationsByLocationId = (await getUserLocation(userEmail)).filter(x => x.location.id === locationId);

  if (userLocationsByLocationId.length === 0) {
    await addDoc(userLocationsCollection, {
      userId: userEmail,
      location: location,
      note: note
    })
  }
}

export const useAddUserLocation = () => {
  return useMutation(addUserLocation)
}

export const getAllLocations = async () => {
  return await getDocs(locationsCollection).then(l => l.docs.map(x => x.data()))
}
