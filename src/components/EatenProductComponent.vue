<template>
	<div class="products-box p-[12px]" :class="{ 'bg-[#ccc]': index % 2 == 0, 'bg-[#eee]': index % 2 !== 0 }">
		<div class="product">
			<div class="product-header flex justify-between items-center">
				<p class="text-[18px]">
					<span class="font-semibold">{{ product.name }}</span
					>({{ product.weight }}g)
				</p>
				<div class="buttons">
					<button class="p-[5px] bg-[#333] rounded-md" @click="editPopup = true">
						<img src="../assets/icons/edit-2.svg" alt="edit icon" />
					</button>
					<button class="p-[5px] bg-[#333] rounded-md ml-[8px]" @click="removePopup = true">
						<img src="../assets/icons/x.svg" alt="X icon" />
					</button>
				</div>
			</div>

			<div class="macros flex justify-between mt-[16px]">
				<div class="flex flex-col items-center">
					<span class="font-semibold">KCAL:</span>
					<span>{{ product.calories }}</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="font-semibold">C:</span>
					<span>{{ product.carbs }}g</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="font-semibold">P:</span>
					<span>{{ product.proteins }}g</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="font-semibold">F:</span> <span>{{ product.fats }}g</span>
				</div>
			</div>
		</div>
	</div>

	<RemoveEatenProductComponent :product="product" v-model="removePopup" />
	<EditEatenProductComponent :product="product" v-model="editPopup" />
</template>

<script setup>
//imports
import { ref } from 'vue'
import { useEatenProducts } from '../store/storeEatenProducts'
import { useStoreProducts } from '../store/storeProducts'
import RemoveEatenProductComponent from './RemoveEatenProductComponent.vue'
import EditEatenProductComponent from './EditEatenProductComponent.vue'

//store
const eatenProducts = useEatenProducts()
const storeProducts = useStoreProducts()

//props
const props = defineProps({
	product: {
		type: Object,
	},
	index: {
		type: Number,
	},
})

//variable for showing remove eaten product popup
const removePopup = ref(false)

//variable for showing edit eaten product
const editPopup = ref(false)

//edit product function
// const editProduct = () => {
// 	const product = storeProducts.products.filter(el => {
// 		return el.id == props.product.uid
// 	})
// }
</script>

<style lang="scss" scoped></style>
