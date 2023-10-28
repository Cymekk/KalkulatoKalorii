<template>
	<!-- GenderInput -->
	<div class="first-input">
		<p class="text-center">Select your gender</p>
		<div class="inputs flex justify-center mt-[8px]">
			<div
				class="input-box"
				:class="{
					'border-2 rounded-md p-[5px] border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.gender.$error,
				}"
			>
				<input type="radio" name="gender" id="female" value="female" v-model="inputsDetails.gender" />
				<label for="female" class="px-[5px]">Female</label>
			</div>
			<div
				class="input-box ml-[16px]"
				:class="{
					'border-2 rounded-md p-[5px] border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.gender.$error,
				}"
			>
				<input type="radio" name="gender" id="man" value="man" v-model="inputsDetails.gender" />
				<label for="man" class="px-[5px]">Man</label>
			</div>
		</div>
		<span class="text-red-500 text-center block font-semibold" v-if="v$.gender.$error">You need to select gender</span>
	</div>

	<!-- HeightInput -->
	<div class="second-input">
		<div class="input-box flex justify-between items-center mb-0">
			<label>Your height(in cm):</label>
			<input
				type="number"
				class="w-[40%] focus:outline-none p-[5px] text-black rounded-md"
				:class="{
					'border-2 p-[5px] border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.height.$error,
				}"
				v-model="inputsDetails.height"
			/>
		</div>
		<span class="text-red-500 text-center block font-semibold" v-if="v$.height.$error"
			>Provide height from scope 100 to 250cm</span
		>
	</div>

	<!-- WeightInput -->
	<div class="third-input">
		<div class="input-box flex justify-between items-center">
			<label>Your weight(in kg):</label>
			<input
				type="number"
				class="w-[40%] focus:outline-none p-[5px] text-black rounded-md"
				:class="{
					'border-2 p-[5px] border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.weight.$error,
				}"
				v-model="inputsDetails.weight"
			/>
		</div>
		<span class="text-red-500 text-center block font-semibold" v-if="v$.weight.$error"
			>Provide weight from scope 10 to 199kg</span
		>
	</div>

	<!-- AgeInput -->
	<div class="fourth-input">
		<div class="input-box flex justify-between items-center">
			<label>Your Age:</label>
			<input
				type="number"
				class="w-[40%] focus:outline-none p-[5px] text-black rounded-md"
				:class="{
					'border-2 p-[5px] border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.age.$error,
				}"
				v-model="inputsDetails.age"
			/>
		</div>
		<span class="text-red-500 text-center block font-semibold" v-if="v$.age.$error"
			>Provide age from scope 1 to 100</span
		>
	</div>

	<!-- GoalInput -->
	<div class="fifth-input">
		<p class="text-center">Select your goal</p>
		<div class="input-box">
			<div class="inputs flex justify-center mt-[8px]">
				<div
					class="input-box flex flex-col"
					:class="{
						'border-2 p-[5px] rounded-md border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.goal.$error,
					}"
				>
					<input type="radio" name="goal" id="loose" value="-500" v-model="inputsDetails.goal" />
					<label for="loose" class="px-[5px] text-center">Loose weight</label>
				</div>
				<div
					class="input-box ml-[16px] flex flex-col"
					:class="{
						'border-2 p-[5px] rounded-md border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.goal.$error,
					}"
				>
					<input type="radio" name="goal" id="stay" value="0" v-model="inputsDetails.goal" />
					<label for="stay" class="px-[5px] text-center">Stay on weight</label>
				</div>
				<div
					class="input-box ml-[16px] flex flex-col"
					:class="{
						'border-2 p-[5px] rounded-md border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.goal.$error,
					}"
				>
					<input type="radio" name="goal" id="increase" value="500" v-model="inputsDetails.goal" />
					<label for="increase" class="px-[5px] text-center">Increse weight</label>
				</div>
			</div>
			<span class="text-red-500 mt-[8px] text-center block font-semibold" v-if="v$.goal.$error">Select your goal</span>
		</div>
	</div>

	<!-- ActivityLevelInput -->
	<div class="input-box">
		<div class="second-input flex justify-between items-center">
			<label>Select your activity level:</label>
			<select
				class="w-[40%] focus:outline-none p-[5px] text-black rounded-md"
				:class="{
					'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.activityLevel.$error,
				}"
				v-model="inputsDetails.activityLevel"
			>
				<option selected disabled></option>
				<option value="1.3">very low activity</option>
				<option value="1.4">sedentary lifestyle</option>
				<option value="1.5">inactive lifestyle</option>
				<option value="1.8">moderate physical activity</option>
				<option value="2">very active lifestyle</option>
				<option value="2.4">most often affects professional athletes</option>
			</select>
		</div>
		<span class="text-red-500 mt-[8px] text-center block font-semibold" v-if="v$.activityLevel.$error"
			>Select your activity level</span
		>
	</div>

	<button
		class="bg-[#B3B3B3] w-[150px] py-4 text-[#333333] font-semibold rounded-md mx-auto hover:bg-[#333333] hover:text-[#b3b3b3] transition-colors duration-500"
		@click="calculateCalories()"
	>
		Calculate
	</button>
</template>

<script setup>
//imports
import { useVuelidate } from '@vuelidate/core'
import { required, maxValue, minValue } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useStoreCalories } from '../store/storeCalories'

//store
const storeCalories = useStoreCalories()

//reactive variable which store informations from inputs
const inputsDetails = reactive({
	gender: '',
	height: '',
	weight: '',
	age: '',
	goal: '',
	activityLevel: '',
})

//rules for validation
const rules = computed(() => {
	return {
		gender: {
			required,
		},
		height: {
			required,
			maxValue: maxValue(250),
			minValue: minValue(100),
		},
		weight: {
			required,
			maxValue: maxValue(199),
			minValue: minValue(10),
		},
		age: {
			required,
			maxValue: maxValue(100),
			minValue: minValue(1),
		},
		goal: {
			required,
		},
		activityLevel: {
			required,
		},
	}
})

//validate form
const v$ = useVuelidate(rules, inputsDetails)

//calculate calories
const calculateCalories = () => {
	v$.value.$validate()
	if (!v$.value.$error) {
		v$.value.$reset()
		storeCalories.calculateCalories(inputsDetails)
		;(inputsDetails.gender = ''),
			(inputsDetails.height = ''),
			(inputsDetails.weight = ''),
			(inputsDetails.age = ''),
			(inputsDetails.goal = ''),
			(inputsDetails.activityLevel = '')
	}
}
</script>

<style lang="scss" scoped></style>
