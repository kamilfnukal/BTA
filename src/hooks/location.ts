import { useMutation, useQuery } from '@tanstack/react-query'
import { locationsCollection, userLocationsCollection, userLocationsDocumentById } from '../utils/firebase'
import { getDocs, addDoc, deleteDoc, updateDoc } from '@firebase/firestore'
import { useSession } from 'next-auth/react'

const removeUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: string }) => {
  const userLocationsByLocationId = (await getUserLocation(userEmail)).filter((x) => x.location.id === locationId)

  const idToBeDeleted = userLocationsByLocationId[0].id
  await deleteDoc(userLocationsDocumentById(idToBeDeleted))
}

export const useRemoveUserLocation = () => {
  return useMutation(removeUserLocation)
}

const getUserLocation = async (userEmail: string | null | undefined) => {
  return await getDocs(userLocationsCollection).then((l) =>
    l.docs.map((x) => x.data()).filter((x) => x.userEmail === userEmail)
  )
}

export const useUserLocations = () => {
  const { data } = useSession()
  return useQuery(['user-location', data?.user?.email], () => getUserLocation(data?.user?.email), {
    // staleTime: 60 * 60
  })
}

const addUserLocation = async ({
  userEmail,
  locationId,
  note
}: {
  userEmail: string
  locationId: string
  note: string
}) => {
  const location = (await getAllLocations()).filter((x) => x.id === locationId)[0]
  const userLocationsByLocationId = (await getUserLocation(userEmail)).filter((x) => x.location.id === locationId)

  if (userLocationsByLocationId.length === 0) {
    const newDocRef = await addDoc(userLocationsCollection, {
      id: '',
      userEmail: userEmail,
      location: location,
      note: note
    })

    await updateDoc(newDocRef, { id: newDocRef.id })
  }
}

export const useAddUserLocation = () => {
  return useMutation(addUserLocation)
}

export const getAllLocations = async () => {
  return await getDocs(locationsCollection).then((l) => l.docs.map((x) => x.data()))
}
