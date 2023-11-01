import { defineStore } from 'pinia'
import { db } from '../firebase/index.js'
import { doc, collection, addDoc, query, onSnapshot, QuerySnapshot, orderBy, deleteDoc } from 'firebase/firestore'
import { useStoreAuth } from '../store/storeAuth.js'
import { v4 as uuidv4 } from 'uuid'

let getProductsSnapshot
let getFavProductsSnapshot
let storeAuth

export const useStoreProducts = defineStore('storeProducts', {
	state: () => {
		return { products: [], favProducts: [], testAccountFavProducts: [] }
	},
	actions: {
		init() {
			storeAuth = useStoreAuth()
			this.getProducts()
			this.getFavProducts()
		},

		getProducts() {
			const q = query(collection(db, 'food'), orderBy('name', 'desc'))
			getProductsSnapshot = onSnapshot(q, querySnapshot => {
				let foodArray = []

				querySnapshot.forEach(doc => {
					let food = {
						id: doc.id,
						uuid: doc.data().uuid,
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

		getFavProducts() {
			const q = query(collection(db, 'favProducts', storeAuth.user.id, 'products'), orderBy('name', 'desc'))
			getFavProductsSnapshot = onSnapshot(q, querySnapshot => {
				let foodArray = []
				this.testAccountFavProducts = []
				querySnapshot.forEach(doc => {
					let food = {
						id: doc.id,
						uuid: doc.data().uuid,
						name: doc.data().name,
						calories: doc.data().calories,
						carbs: doc.data().carbs,
						proteins: doc.data().proteins,
						fats: doc.data().fats,
					}

					if (storeAuth.testAccount) {
						this.testAccountFavProducts.push(doc.id)
					}
					foodArray.unshift(food)
				})
				this.favProducts = foodArray
			})
		},

		clearProductsAndFav() {
			this.testAccountFavProducts = []
			this.products = []
			this.favProducts = []
			if (getProductsSnapshot) {
				getProductsSnapshot()
			}
			if (getFavProductsSnapshot) {
				getFavProductsSnapshot()
			}
		},

		async addProduct(productInfo) {
			await addDoc(collection(db, 'food'), {
				uuid: uuidv4(),
				name: productInfo.name,
				calories: productInfo.calories,
				carbs: productInfo.carbs,
				proteins: productInfo.proteins,
				fats: productInfo.fats,
			})
		},

		async addFavProduct(productInfo) {
			const storeAuth = useStoreAuth()
			await addDoc(collection(db, 'favProducts', storeAuth.user.id, 'products'), {
				uuid: productInfo.uuid,
				name: productInfo.name,
				calories: productInfo.calories,
				carbs: productInfo.carbs,
				proteins: productInfo.proteins,
				fats: productInfo.fats,
			})
		},

		async removeFavProduct(id) {
			const storeAuth = useStoreAuth()
			await deleteDoc(doc(db, 'favProducts', storeAuth.user.id, 'products', id))
		},

		removeTestFavProducts() {
			this.testAccountFavProducts.forEach(el => {
				deleteDoc(doc(db, 'favProducts', storeAuth.user.id, 'products', el))
			})
		},
	},
})
