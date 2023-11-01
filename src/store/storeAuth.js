import { defineStore } from 'pinia'
import { auth } from '../firebase/index'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth'
import { useStoreCalories } from './storeCalories'
import { useStoreProducts } from './storeProducts'
import { useEatenProducts } from './storeEatenProducts'
import { useStoreTracker } from './storeTrackers'

let storeCalories
let storeProducts
let eatenProducts
let storeTrackers

export const useStoreAuth = defineStore('storeAuth', {
	state: () => {
		return {
			user: {},
			error: '',
			testAccount: false,
			popup: true,
		}
	},

	actions: {
		init() {
			storeCalories = useStoreCalories()
			storeProducts = useStoreProducts()
			eatenProducts = useEatenProducts()
			storeTrackers = useStoreTracker()
			onAuthStateChanged(auth, user => {
				if (user) {
					this.user.id = user.uid
					storeCalories.init()
					storeProducts.init()
					eatenProducts.init()
					storeTrackers.init()
					if (user.uid === 'FE7woJP1jxTpnsnzGbW2B2HZB083') {
						this.testAccount = true
					}
					this.router.push('/')
				} else {
					this.user = {}
					this.testAccount = false
					this.router.replace('/auth')
					eatenProducts.clearEatenProducts()
					storeProducts.clearProductsAndFav()
					storeTrackers.clearWeightsAndWaists()
				}
			})
		},

		registerUser(credentials) {
			const auth = getAuth()
			createUserWithEmailAndPassword(auth, credentials.login, credentials.password)
				.then(user => {
					alert('Account created successfully')
					this.error = ''
				})
				.catch(err => {
					this.error = err.message
				})
		},

		login(credentials) {
			signInWithEmailAndPassword(auth, credentials.login, credentials.password)
				.then(userCredentials => {
					this.error = ''
				})
				.catch(err => {
					this.error = err.message
				})
		},

		logoutUser() {
			signOut(auth)
				.then(() => {
					this.router.push('/auth')
				})
				.catch(error => {
					console.log(error.message)
				})
		},

		resetData() {
			storeCalories.deleteTestCalories()
			eatenProducts.removeTestProducts()
			storeProducts.removeTestFavProducts()
			storeTrackers.removeAllTestData()
		},
	},

	getters: {},
})
