<template>
	<div class="product bg-[#ccc] p-[16px]">
		<div class="product-header flex justify-between items-center mb-[16px]">
			<div class="name">
				<span class="font-semibold">{{ product.name }}</span>
			</div>
			<div class="buttons flex space-x-[6px]">
				<button class="p-[5px] rounded-md bg-[#333333]">
					<img src="../assets/icons/heart.svg" alt="heart icon" />
				</button>
				<button class="p-[5px] rounded-md bg-[#333333] hidden">
					<img src="../assets/icons/heart-filled.svg" alt="heart filled icon" />
				</button>
				<button class="p-[5px] rounded-md bg-[#333333]" @click="showInfo(product.id)">
					<img src="../assets/icons/plus.svg" alt="plus icon" />
				</button>
			</div>
		</div>
		<div class="macros flex justify-between">
			<div><span class="font-semibold">KCAL:</span> {{ product.calories }}</div>
			<div><span class="font-semibold">C:</span> {{ product.carbs }}</div>
			<div><span class="font-semibold">P:</span> {{ product.proteins }}</div>
			<div><span class="font-semibold">F:</span> {{ product.fats }}</div>
		</div>
	</div>
	<AddEatenProductPopup :product="product" />
</template>

<script setup>
import AddEatenProductPopup from './AddEatenProductPopup.vue'

const props = defineProps({
	product: {
		type: Object,
	},
})

const showInfo = id => {
	console.log(id)
}
</script>

<style lang="scss" scoped></style>
