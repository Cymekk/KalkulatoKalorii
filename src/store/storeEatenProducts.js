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
import { useNow, useDateFormat } from "@vueuse/core"

let eatenFoodCollectionRef
let storeAuth
let formatted

export const useEatenProducts = defineStore("storeEatenProducts", {
	state: () => {
		return {
			eatenProducts: [],
			whichMeal: "",
			breakfestBox: false,
			lunchBox: false,
			snackBox: false,
			dinnerBox: false,
			isLoaded: false,
		}
	},
	actions: {
		init() {
			storeAuth = useStoreAuth()
			eatenFoodCollectionRef = collection(
				db,
				"eatenProducts",
				storeAuth.user.id,
				"eatenFood"
			)
			formatted = useDateFormat(useNow(), "YYYY-MM-DD")
			this.getEatenProducts(formatted.value)
		},

		async getEatenProducts(date) {
			const q = query(eatenFoodCollectionRef)
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
						date: doc.data().date,
						meal: doc.data().whichMeal,
						uid: doc.data().uid,
						weight: doc.data().weight,
					}

					foodArray.unshift(food)
					this.isLoaded = true
				})
				if (this.isLoaded) {
					this.eatenProducts = foodArray.filter(el => el.date == date)
				}
			})
		},

		async addEatenProduct(productInfo, weight) {
			await addDoc(eatenFoodCollectionRef, {
				name: productInfo.name,
				calories: (productInfo.calories * (weight / 100)).toFixed(1),
				carbs: (productInfo.carbs * (weight / 100)).toFixed(1),
				proteins: (productInfo.proteins * (weight / 100)).toFixed(1),
				fats: (productInfo.fats * (weight / 100)).toFixed(1),
				date: formatted.value,
				whichMeal: this.whichMeal,
				uid: productInfo.id,
				weight: weight,
			})
			this.router.push("/")
		},

		async removeEatenProduct(id) {
			await deleteDoc(
				doc(db, "eatenProducts", storeAuth.user.id, "eatenFood", id)
			)
		},

		assignMeal(meal) {
			this.whichMeal = meal
		},

		showBreakfestBox() {
			this.breakfestBox = !this.breakfestBox
		},

		showLunchBox() {
			this.lunchBox = !this.lunchBox
		},

		showSnacksBox() {
			this.snackBox = !this.snackBox
		},

		showDinnerBox() {
			this.dinnerBox = !this.dinnerBox
		},
	},

	getters: {
		Breakfest() {
			return this.eatenProducts.filter(el => el.meal == "Breakfest")
		},
		Lunch() {
			return this.eatenProducts.filter(el => el.meal == "Lunch")
		},
		Snacks() {
			return this.eatenProducts.filter(el => el.meal == "Snacks")
		},
		Dinner() {
			return this.eatenProducts.filter(el => el.meal == "Dinner")
		},
		TotalCalories() {
			let totalCalories = 0
			this.eatenProducts.forEach(
				el => (totalCalories += parseFloat(el.calories))
			)

			return totalCalories
		},

		TotalCarbs() {
			let TotalCarbs = 0
			this.eatenProducts.forEach(el => (TotalCarbs += parseFloat(el.carbs)))
			return TotalCarbs
		},
		TotalProteins() {
			let totalProteins = 0
			this.eatenProducts.forEach(
				el => (totalProteins += parseFloat(el.proteins))
			)
			return totalProteins
		},
		TotalFats() {
			let totalFats = 0
			this.eatenProducts.forEach(el => (totalFats += parseFloat(el.fats)))
			return totalFats
		},
	},
})
