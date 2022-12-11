import { useMutation } from '@tanstack/react-query'
import { locationsCollection, userLocationsCollection, userLocationsDocumentById } from '../utils/firebase'
import { getDocs, addDoc, deleteDoc, updateDoc } from '@firebase/firestore'

const removeUserLocation = async ({ userEmail, locationId }: { userEmail: string; locationId: string }) => {
  const userLocationsByLocationId = (await getUserLocation(userEmail)).filter(x => x.location.id === locationId);

  const idToBeDeleted = userLocationsByLocationId[0].id
  await deleteDoc(userLocationsDocumentById(idToBeDeleted))}

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
    var newDocRef = await addDoc(userLocationsCollection, {
      id: "",
      userId: userEmail,
      location: location,
      note: note
    })

    await updateDoc(newDocRef, {id: newDocRef.id})
  }
}

export const useAddUserLocation = () => {
  return useMutation(addUserLocation)
}

export const getAllLocations = async () => {
  return await getDocs(locationsCollection).then(l => l.docs.map(x => x.data()))
}
