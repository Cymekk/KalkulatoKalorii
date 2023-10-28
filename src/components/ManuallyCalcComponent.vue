<template>
	<div class="inputs flex flex-col space-y-[16px]">
		<div class="input-box flex justify-between items-center">
			<label>Total number of calories:</label>
			<input
				type="number"
				class="w-[40%] p-[5px] text-black focus:outline-none rounded-md"
				:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': isError }"
				v-model="caloriesDetails.total"
			/>
		</div>
		<div class="input-box flex justify-between items-center">
			<label>Calories from carbs:</label>
			<input
				type="number"
				class="w-[40%] p-[5px] text-black focus:outline-none rounded-md"
				:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': isError }"
				v-model="caloriesDetails.carbs"
			/>
		</div>

		<div class="input-box flex justify-between items-center">
			<label>Calories from proteins:</label>
			<input
				type="number"
				class="w-[40%] p-[5px] text-black focus:outline-none rounded-md"
				:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': isError }"
				v-model="caloriesDetails.proteins"
			/>
		</div>
		<div class="input-box flex justify-between items-center">
			<label>Calories from fats:</label>
			<input
				type="number"
				class="w-[40%] p-[5px] text-black focus:outline-none rounded-md"
				:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': isError }"
				v-model="caloriesDetails.fats"
			/>
		</div>
	</div>

	<button
		class="bg-[#B3B3B3] w-[150px] py-4 text-[#333333] font-semibold rounded-md mx-auto hover:bg-[#333333] hover:text-[#b3b3b3] transition-colors duration-500"
		:class="{
			'opacity-50 pointer-events-none':
				caloriesDetails.total == '' ||
				caloriesDetails.carbs == '' ||
				caloriesDetails.proteins == '' ||
				caloriesDetails.fats == '',
		}"
		@click="saveCalories()"
	>
		Save
	</button>

	<span class="text-red-500" v-if="isError"
		>Total number of calories need to equals sum of calories from carbs, proteins and fats</span
	>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStoreCalories } from '../store/storeCalories'

const storeCalories = useStoreCalories()

const caloriesDetails = reactive({
	total: '',
	carbs: '',
	proteins: '',
	fats: '',
})

const isError = ref(false)

const saveCalories = () => {
	if (caloriesDetails.total == caloriesDetails.carbs + caloriesDetails.proteins + caloriesDetails.fats) {
		storeCalories.saveCalories(caloriesDetails)
		isError.value = false
	} else {
		isError.value = true
	}
}
</script>

<style lang="scss" scoped></style>
