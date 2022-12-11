import { initializeApp } from 'firebase/app';
import {
	collection,
    doc,
	CollectionReference,
    DocumentReference,
	getFirestore,
} from 'firebase/firestore';
import { Coord } from '../types';

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
    coordinate: Coord;
    distance: number;
	name: string;
    image: string;
};

export const locationsCollection = collection(
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

// RecentlySearchedTrips collection
export type RecentlySearchedTrips = {
    id: string;
    from: Coord;
    to: Coord;
    searchedOn: Date;
    pinned: boolean;
    userId: string;
};

export const recentlySearchedTripsCollection = collection(
	db,
	'recentlySearchedTrips'
) as CollectionReference<RecentlySearchedTrips>;

export const recentlySearchedTripsDocument =
	doc(collection(db, 'recentlySearchedTrips')) as DocumentReference<RecentlySearchedTrips>;

export const recentlySearchedTripsDocumentById = (id: string) => 
	doc(db, 'recentlySearchedTrips', id) as DocumentReference<RecentlySearchedTrips>;
