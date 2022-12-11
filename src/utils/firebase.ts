import { initializeApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	getFirestore,
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
    apiKey: "AIzaSyAWovbqlGt5iWlODxVXG9jar-D7Kvsz5-w",
    authDomain: "brno-bike-advisor.firebaseapp.com",
    projectId: "brno-bike-advisor",
    storageBucket: "brno-bike-advisor.appspot.com",
    messagingSenderId: "309559427226",
    appId: "1:309559427226:web:a50892c3ff85629239df23"
});

// Firestore
const db = getFirestore();

// Users collection
export type User = {
	id: string;
	name: string;
};

export const usersCollection = collection(
	db,
	'users'
) as CollectionReference<User>;

// Locations collection
export type Location = {
	id: string;
    latitude: number;
    longitude: number;
    distance: number;
	name: string;
    pinned: boolean;
};

export const matchesCollection = collection(
	db,
	'locations'
) as CollectionReference<Location>;

// UserLocations collection
export type UserLocations = {
	userId: string;
	locationId: string;
};

export const userLocationsCollection = collection(
	db,
	'userLocations'
) as CollectionReference<UserLocations>;
