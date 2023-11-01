<template>
	<div class="w-full h-[100svh] flex items-center justify-center">
		<div class="logo flex items-center md:justify-center absolute top-0 left-0 p-[32px] w-full">
			<img src="../assets/icons/calculator.svg" alt="Calculator icon" />
			<h1 class="text-[#D9D9D9] font-bold text-[24px] ml-[12px]">Calories Calculator</h1>
		</div>

		<div
			class="login-box bg-[#404040] w-[80%] max-w-[400px] rounded-md p-[32px] text-[#D9D9D9] shadow-[0_0_5px_1px_rgba(217,217,217,.5)]"
		>
			<div class="header flex items-center justify-center space-x-[32px]">
				<span
					class="text-[22px] font-semibold cursor-pointer"
					:class="{ 'border-b-2': register }"
					@click="register = true"
					>Login</span
				>
				<span
					class="text-[22px] font-semibold cursor-pointer"
					:class="{ 'border-b-2': !register }"
					@click="register = false"
					>Register</span
				>
			</div>

			<form @submit.prevent="validateForm" class="inputs mt-[32px] flex flex-col items-center">
				<!-- email input -->
				<div
					class="input-box relative border-b-2 border-[#D9D9D9] w-full"
					:class="{ 'text-[#EF4444] border-[#EF4444]': v$.login.$error }"
				>
					<input
						type="email"
						class="w-full p-[5px] focus:outline-none rounded-md bg-transparent font-semibold"
						@focusin="inputsFilled.email = true"
						@focusout="checkEmailInput"
						v-model="credentials.login"
					/>
					<label
						class="absolute left-[5px] transition-transform duration-300"
						:class="{ 'bottom-0': !inputsFilled.email, '-translate-y-[60%]': inputsFilled.email }"
						>Email Address</label
					>
				</div>
				<span v-if="v$.login.$error" class="text-[#EF4444]">Email address is required</span>

				<!-- password input -->
				<div
					class="input-box relative border-b-2 border-[#D9D9D9] w-full my-[24px]"
					:class="{ 'text-[#EF4444] border-[#EF4444] mb-0': v$.password.$error }"
				>
					<input
						type="password"
						class="w-full p-[5px] focus:outline-none rounded-md bg-transparent"
						@focusin="inputsFilled.password = true"
						@focusout="checkPasswordInput"
						v-model="credentials.password"
					/>
					<label
						class="absolute left-[5px] transition-transform duration-300"
						:class="{ 'bottom-0': !inputsFilled.password, '-translate-y-[60%]': inputsFilled.password }"
						>Password</label
					>
				</div>
				<span class="text-[#EF4444] text-center mb-[24px]" v-if="v$.password.$error"
					>Password is required, min length is 7 characters</span
				>

				<input
					type="submit"
					class="bg-[#333333] px-6 py-3 font-semibold rounded-md hover:bg-[#d9d9d9] hover:text-[#333333] transition-colors duration-500"
					:value="title"
				/>

				<span class="mt-[24px] text-[#EF4444] text-center" v-if="storeAuth.error">{{ error }}</span>
			</form>
		</div>
	</div>
</template>

<script setup>
//import
import { ref, computed, reactive } from 'vue'
import { useStoreAuth } from '../store/storeAuth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

//stores
const storeAuth = useStoreAuth()

//error msg from firebase
const error = computed(() => {
	return storeAuth.error
})

//variable which handling register/login button
const register = ref(true)

const title = computed(() => {
	return register.value ? 'Login' : 'Register'
})

//ractive variable storing credentials for login/register
const credentials = reactive({
	login: '',
	password: '',
})

//reactive variable for handling labels
const inputsFilled = reactive({
	email: false,
	password: false,
})

//function for checking that Email input is empty or not on Focout event
const checkEmailInput = () => {
	if (credentials.login === '') {
		inputsFilled.email = false
	} else {
		inputsFilled.email = true
	}
}

//function for checking that Password input is empty or not on Focout event
const checkPasswordInput = () => {
	if (credentials.password === '') {
		inputsFilled.password = false
	} else {
		inputsFilled.password = true
	}
}

//handling Login/Register process
const handleLoginRegisterForm = () => {
	if (!register.value) {
		storeAuth.registerUser(credentials)
	} else {
		storeAuth.login(credentials)
	}
}

const rules = computed(() => {
	return {
		login: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(7),
		},
	}
})

const v$ = useVuelidate(rules, credentials)
const validateForm = () => {
	v$.value.$validate()
	if (!v$.value.$error) {
		handleLoginRegisterForm()
	}
}
</script>

<style lang="scss" scoped></style>
