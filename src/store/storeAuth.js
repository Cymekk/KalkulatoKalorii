import { defineStore } from "pinia"
import { auth } from "../firebase/index"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"
import { useStoreCalories } from "./storeCalories"
import { useStoreProducts } from "./storeProducts"
import { useEatenProducts } from "./storeEatenProducts"

let storeCalories
let storeProducts
let eatenProducts

export const useStoreAuth = defineStore("storeAuth", {
	state: () => {
		return {
			user: {},
			error: "",
		}
	},

	actions: {
		init() {
			storeCalories = useStoreCalories()
			storeProducts = useStoreProducts()
			eatenProducts = useEatenProducts()
			onAuthStateChanged(auth, user => {
				if (user) {
					this.user.id = user.uid
					storeCalories.init()
					storeProducts.getProducts()
					storeProducts.getFavProducts()
					eatenProducts.init()
					this.router.push("/")
				} else {
					this.user = {}
					this.loaded = false
				}
			})
		},

		registerUser(credentials) {
			const auth = getAuth()
			createUserWithEmailAndPassword(
				auth,
				credentials.login,
				credentials.password
			)
				.then(user => {
					alert("Account created successfully")
					this.error = ""
				})
				.catch(err => {
					this.error = err.message
				})
		},

		login(credentials) {
			signInWithEmailAndPassword(auth, credentials.login, credentials.password)
				.then(userCredentials => {
					this.error = ""
				})
				.catch(err => {
					this.error = err.message
				})
		},

		logoutUser() {
			signOut(auth)
				.then(() => {
					this.router.push("/auth")
				})
				.catch(error => {
					console.log(error.message)
				})
		},
	},

	getters: {},
})
