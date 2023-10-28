<template>
	<div class="container p-[32px]">
		<div class="products-container bg-[#d9d9d9] p-[16px] rounded-md">
			<input
				type="text"
				placeholder="type product name"
				class="p-[5px] rounded-md block mx-auto"
				v-model="searchValue"
			/>

			<div class="texts my-[16px] flex items-center justify-center space-x-[16px]">
				<span :class="{ 'border-b-[1px] border-[#333333]': underline }" @click="underline = true">All Products</span>
				<span :class="{ 'border-b-[1px] border-[#333333]': !underline }" @click="underline = false">Favorites</span>
			</div>

			<div class="products-box" v-if="underline">
				<span class="text-[rgb(239,68,68)] font-semibold mb-[16px] block text-center" v-if="allProducts.length == 0"
					>No product in database, you can add product by using below button</span
				>
				<button
					class="bg-[#333] text-[#ccc] px-4 py-2 mb-[16px] mx-auto block rounded-md font-semibold hover:bg-[#cccccc] hover:text-[rgb(51,51,51)] transition-colors duration-500 shadow-[0_0_5px_5px_rgba(51,51,51,.5)]"
					@click="addProduct = true"
				>
					Add product
				</button>

				<OneProductComponent v-for="product in allProducts" :key="product.id" :product="product" />
			</div>
		</div>
	</div>

	<AddProductPopup v-model="addProduct" />
</template>

<script setup>
//imports
import { ref, computed } from 'vue'
import { useStoreProducts } from '../store/storeProducts'
import AddProductPopup from './AddProductPopup.vue'
import OneProductComponent from './OneProductComponent.vue'

//store
const storeProducts = useStoreProducts()

//variable for handling underline class
const underline = ref(true)

//variable which handling add product popup
const addProduct = ref(false)

//products from firebase
const allProducts = computed(() => {
	return storeProducts.products
})

//search value
const searchValue = ref('')
</script>

<style lang="scss" scoped>
.product {
	&:nth-child(odd) {
		background-color: #ededed;
	}
}
</style>
