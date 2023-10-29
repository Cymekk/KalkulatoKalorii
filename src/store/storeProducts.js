import { defineStore } from "pinia"
import { db } from "../firebase/index.js"
import {
	doc,
	collection,
	addDoc,
	query,
	onSnapshot,
	QuerySnapshot,
	orderBy,
	deleteDoc,
} from "firebase/firestore"
import { useStoreAuth } from "../store/storeAuth.js"

export const useStoreProducts = defineStore("storeProducts", {
	state: () => {
		return { products: [], favProducts: [] }
	},
	actions: {
		async getProducts() {
			const q = query(collection(db, "food"), orderBy("name", "desc"))
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

		async getFavProducts() {
			const storeAuth = useStoreAuth()
			const q = query(
				collection(db, "favProducts", storeAuth.user.id, "products"),
				orderBy("name", "desc")
			)
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
				this.favProducts = foodArray
			})
		},

		async addProduct(productInfo) {
			await addDoc(collection(db, "food"), {
				name: productInfo.name,
				calories: productInfo.calories,
				carbs: productInfo.carbs,
				proteins: productInfo.proteins,
				fats: productInfo.fats,
			})
		},

		async addFavProduct(productInfo) {
			const storeAuth = useStoreAuth()
			await addDoc(
				collection(db, "favProducts", storeAuth.user.id, "products"),
				{
					name: productInfo.name,
					calories: productInfo.calories,
					carbs: productInfo.carbs,
					proteins: productInfo.proteins,
					fats: productInfo.fats,
				}
			)
		},

		async removeFavProduct(id) {
			const storeAuth = useStoreAuth()
			await deleteDoc(doc(db, "favProducts", storeAuth.user.id, "products", id))
		},
	},
})
