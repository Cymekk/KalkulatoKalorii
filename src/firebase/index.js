import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD9K9J9DIvHT3mwaV--p4Ed9nKXZNykl9U',
	authDomain: 'kalkulatorkalorii-7b44e.firebaseapp.com',
	projectId: 'kalkulatorkalorii-7b44e',
	storageBucket: 'kalkulatorkalorii-7b44e.appspot.com',
	messagingSenderId: '1003674720467',
	appId: '1:1003674720467:web:011b6468c87428c9a3dc26',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
