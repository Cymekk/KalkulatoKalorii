import { defineStore } from 'pinia'
import { db } from '../firebase/index.js'
import { collection, addDoc, query, onSnapshot, QuerySnapshot, orderBy } from 'firebase/firestore'

export const useStoreProducts = defineStore('storeProducts', {
	state: () => {
		return { products: [] }
	},
	actions: {
		async getProducts() {
			const q = query(collection(db, 'food'), orderBy('name', 'desc'))
			onSnapshot(q, querySnapshot => {
				let foodArray = []
				querySnapshot.forEach(doc => {
					let food = {
						id: doc.id,
						name: doc.data().name,
						calories: doc.data().calories,
						carbs: doc.data().carbs,
						proteins: doc.data().proteins,
						fats: doc.data().fats,
					}

					foodArray.unshift(food)
				})
				this.products = foodArray
			})
		},

		async addProduct(productInfo) {
			await addDoc(collection(db, 'food'), {
				name: productInfo.name,
				calories: productInfo.calories,
				carbs: productInfo.carbs,
				proteins: productInfo.proteins,
				fats: productInfo.fats,
			})
		},
	},
})
