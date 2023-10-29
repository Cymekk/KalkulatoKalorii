<template>
	<div class="macros px-[32px] absolute bottom-0 w-full">
		<div class="container p-[16px] bg-[#d9d9d9] rounded-t-md pb-0">
			<div class="total">
				<progress
					class="w-full progress-unfilled:bg-[#F2F2F2]"
					:class="{
						'progress-filled:bg-blue-600':
							storeEatenProducts.TotalCalories < totalCalories,
						'progress-filled:bg-red-600':
							storeEatenProducts.TotalCalories > totalCalories,
					}"
					:value="storeEatenProducts.TotalCalories"
					:max="totalCalories"></progress>
				<span
					class="text-center block"
					:class="{
						'text-red-600': storeEatenProducts.TotalCalories > totalCalories,
					}"
					><span class="font-semibold">KCAL:</span>
					{{ storeEatenProducts.TotalCalories }}/{{ totalCalories }}</span
				>
			</div>

			<div class="macro-elements flex justify-between text-[14px]">
				<!-- Carbs -->
				<div class="element w-[30%]">
					<progress
						class="w-full progress-unfilled:bg-[#F2F2F2]"
						:class="{
							'progress-filled:bg-blue-700':
								storeEatenProducts.TotalCarbs < carbsCalories,
							'progress-filled:bg-red-600':
								storeEatenProducts.TotalCarbs > carbsCalories,
						}"
						:value="storeEatenProducts.TotalCarbs"
						:max="carbsCalories"></progress>
					<div
						class="flex flex-col items-center justify-center"
						:class="{
							'text-red-600': storeEatenProducts.TotalCarbs > carbsCalories,
						}">
						<span class="font-semibold">C:</span>
						<span
							>{{ storeEatenProducts.TotalCarbs }}/{{ carbsCalories }}g</span
						>
					</div>
				</div>

				<!-- Proteins -->
				<div class="element w-[30%]">
					<progress
						class="w-full progress-unfilled:bg-[#F2F2F2]"
						:class="{
							'progress-filled:bg-blue-800':
								storeEatenProducts.TotalProteins < proteinslCalories,
							'progress-filled:bg-red-600':
								storeEatenProducts.TotalProteins > proteinslCalories,
						}"
						:value="storeEatenProducts.TotalProteins"
						:max="proteinslCalories"></progress>

					<div
						class="flex flex-col items-center justify-center"
						:class="{
							'text-red-600':
								storeEatenProducts.TotalProteins > proteinslCalories,
						}">
						<span class="font-semibold">P:</span>
						<span
							>{{ storeEatenProducts.TotalProteins }}/{{
								proteinslCalories
							}}g</span
						>
					</div>
				</div>

				<!-- fats -->
				<div class="element w-[30%]">
					<progress
						class="w-full progress-unfilled:bg-[#F2F2F2]"
						:class="{
							'progress-filled:bg-blue-900':
								storeEatenProducts.TotalFats < fatsCalories,
							'progress-filled:bg-red-600':
								storeEatenProducts.TotalFats > fatsCalories,
						}"
						:value="storeEatenProducts.TotalFats"
						:max="fatsCalories"></progress>

					<div
						class="flex flex-col items-center justify-center"
						:class="{
							'text-red-600': storeEatenProducts.TotalFats > fatsCalories,
						}">
						<span class="font-semibold">F:</span>
						<span>{{ storeEatenProducts.TotalFats }}/{{ fatsCalories }}g</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { computed } from "vue"
import { useStoreCalories } from "../store/storeCalories"
import { useEatenProducts } from "../store/storeEatenProducts"
import { useRouter } from "vue-router"

//store
const storeCalories = useStoreCalories()
const storeEatenProducts = useEatenProducts()

//router
const router = useRouter()

//download macros from store
const totalCalories = computed(() => {
	return storeCalories.calories.totalCalories
})
const carbsCalories = computed(() => {
	return storeCalories.calories.carbsCalories
})
const proteinslCalories = computed(() => {
	return storeCalories.calories.proteinsCalories
})
const fatsCalories = computed(() => {
	return storeCalories.calories.fatsCalories
})

//checking that caloric need is calculated, if not redirect to calculate caloric need page
if (totalCalories.value === "") {
	router.push("/calccalories")
}
</script>

<style lang="scss" scoped>
</style>
