<template>
	<div class="macros px-[32px] absolute bottom-0 w-full">
		<div class="container p-[16px] bg-[#d9d9d9] rounded-t-md pb-0">
			<div class="total">
				<progress class="w-full" value="200" :max="totalCalories"></progress>
				<span class="text-center block">KCAL: {{ totalCalories }}</span>
			</div>

			<div class="macro-elements flex justify-between">
				<div class="element w-[30%]">
					<progress class="w-full rounded-md"></progress>
					<span class="text-center block">C: {{ carbsCalories }} g</span>
				</div>
				<div class="element w-[30%]">
					<progress class="w-full"></progress>
					<span class="text-center block">P: {{ proteinslCalories }} g</span>
				</div>
				<div class="element w-[30%]">
					<progress class="w-full"></progress>
					<span class="text-center block">F: {{ fatsCalories }} g</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { computed } from 'vue'
import { useStoreCalories } from '../store/storeCalories'
import { useRouter } from 'vue-router'

//store
const storeCalories = useStoreCalories()

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

if (totalCalories.value === '') {
	router.push('/calccalories')
}
</script>

<style lang="scss" scoped></style>
