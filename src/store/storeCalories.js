import { defineStore } from 'pinia'
import { db } from '../firebase/index.js'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useStoreAuth } from './storeAuth'

export const useStoreCalories = defineStore('storeCalories', {
	state: () => {
		return {
			calories: {
				totalCalories: 0,
				carbsCalories: 0,
				proteinsCalories: 0,
				fatsCalories: 0,
			},
		}
	},
	actions: {
		init() {
			this.getCaloriesFromDb()
		},

		saveCalories(inputDetails) {
			const calories = {}
			calories.totalCalories = inputDetails.total
			calories.carbsCalories = (inputDetails.carbs / 4).toFixed(1)
			calories.proteinsCalories = (inputDetails.proteins / 4).toFixed(1)
			calories.fatsCalories = (inputDetails.fats / 9).toFixed(1)
			this.addCaloriesToDb(calories)
			this.router.push('/')
		},

		calculateCalories(inputDetails) {
			let PPM = 0
			const calories = {}
			if (inputDetails.gender === 'man') {
				PPM = 10 * inputDetails.weight + 6.25 * inputDetails.height - 5 * inputDetails.age - 161
				calories.totalCalories = (PPM * inputDetails.activityLevel - parseInt(inputDetails.goal)).toFixed()
				this.calculateMacros(calories)
				this.router.push('/')
			} else {
				PPM = 10 * inputDetails.weight + 6.25 * inputDetails.height - 5 * inputDetails.age + 5
				calories.totalCalories = (PPM * inputDetails.activityLevel - parseInt(inputDetails.goal)).toFixed()
				this.calculateMacros(calories)
				this.router.push('/')
			}
		},

		calculateMacros(calories) {
			calories.carbsCalories = ((calories.totalCalories * 0.5) / 4).toFixed(1)
			calories.proteinsCalories = ((calories.totalCalories * 0.3) / 4).toFixed(1)
			calories.fatsCalories = ((calories.totalCalories * 0.2) / 9).toFixed(1)
			this.addCaloriesToDb(calories)
		},

		async addCaloriesToDb(calories) {
			const storeAuth = useStoreAuth()
			await setDoc(doc(db, 'calories', storeAuth.user.id), {
				totalCalories: calories.totalCalories,
				carbsCalories: calories.carbsCalories,
				proteinsCalories: calories.proteinsCalories,
				fatsCalories: calories.fatsCalories,
			})
		},

		async getCaloriesFromDb() {
			const storeAuth = useStoreAuth()
			const docRef = doc(db, 'calories', storeAuth.user.id)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				;(this.calories.totalCalories = docSnap.data().totalCalories),
					(this.calories.carbsCalories = docSnap.data().carbsCalories),
					(this.calories.proteinsCalories = docSnap.data().proteinsCalories),
					(this.calories.fatsCalories = docSnap.data().fatsCalories)
			}
		},
	},
})
