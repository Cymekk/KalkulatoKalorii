import { defineStore } from 'pinia'
import { db } from '../firebase/index.js'
import { doc, collection, addDoc, query, onSnapshot, QuerySnapshot, orderBy, deleteDoc } from 'firebase/firestore'
import { useStoreAuth } from '../store/storeAuth.js'

let userWeightCollectionRef
let userWaistCollectionRef
let storeAuth
let getWeightsSnapshot
let getWaistsSnapshot

export const useStoreTracker = defineStore('storeTrackers', {
	state: () => {
		return { weightsArray: [], waistsArray: [], isloaded: false, testWeights: [], testWaists: [] }
	},
	actions: {
		init() {
			storeAuth = useStoreAuth()
			userWeightCollectionRef = collection(db, 'users', storeAuth.user.id, 'weights')
			userWaistCollectionRef = collection(db, 'users', storeAuth.user.id, 'waists')
			this.getWeights()
		},

		getWeights() {
			const q = query(userWeightCollectionRef, orderBy('date'))
			getWeightsSnapshot = onSnapshot(q, querySnapshot => {
				this.testWeights = []
				let weights = []
				querySnapshot.forEach(doc => {
					let element = {
						id: doc.id,
						weight: doc.data().weight,
						date: doc.data().date,
					}
					weights.push(element)

					if (storeAuth.testAccount) {
						this.testWeights.push(doc.id)
					}
				})

				this.weightsArray = weights
				this.getWaists()
				this.isloaded = false
			})
		},

		getWaists() {
			const q = query(userWaistCollectionRef, orderBy('date'))
			getWaistsSnapshot = onSnapshot(q, querySnapshot => {
				this.testWaists = []
				let waists = []
				querySnapshot.forEach(doc => {
					let element = {
						id: doc.id,
						waist: doc.data().waist,
						date: doc.data().date,
					}
					waists.push(element)

					if (storeAuth.testAccount) {
						this.testWaists.push(doc.id)
					}
				})

				this.waistsArray = waists
			})
		},

		clearWeightsAndWaists() {
			this.testWaists = []
			this.testWeights = []
			;(this.weightsArray = []), (this.waistsArray = [])

			if (getWeightsSnapshot) {
				getWeightsSnapshot()
			}
			if (getWaistsSnapshot) {
				getWaistsSnapshot()
			}
		},

		async addWeight(weightInput, date) {
			await addDoc(userWeightCollectionRef, {
				weight: weightInput.value,
				date: date,
			})
		},

		async addWaist(waistInput, date) {
			await addDoc(userWaistCollectionRef, {
				waist: waistInput.value,
				date: date,
			})
		},

		removeAllTestData() {
			this.testWaists.forEach(el => {
				deleteDoc(doc(db, 'users', storeAuth.user.id, 'waists', el))
			})
			this.testWeights.forEach(el => {
				deleteDoc(doc(db, 'users', storeAuth.user.id, 'weights', el))
			})
		},
	},

	getters: {},
})
