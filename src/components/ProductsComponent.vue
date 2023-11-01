<template>
	<div class="container max-w-[600px] p-[32px]">
		<div class="products-container bg-[#d9d9d9] p-[16px] rounded-md">
			<input
				type="text"
				placeholder="type product name"
				class="p-[5px] rounded-md block mx-auto"
				v-model="searchValue"
				@input="searchProducts"
			/>

			<div class="texts my-[16px] flex items-center justify-center space-x-[16px]">
				<span class="cursor-pointer" :class="{ 'border-b-[1px] border-[#333333]': underline }" @click="underline = true"
					>All Products</span
				>
				<span
					class="cursor-pointer"
					:class="{ 'border-b-[1px] border-[#333333]': !underline }"
					@click="underline = false"
					>Favorites</span
				>
			</div>

			<!-- All Products section -->
			<div class="products-box" v-if="underline">
				<span
					class="text-[rgb(239,68,68)] font-semibold mb-[16px] block text-center"
					v-if="storeProducts.products.length == 0"
					>No product in database, you can add product by using below button</span
				>
				<button
					class="bg-[#333] text-[#ccc] px-4 py-2 mb-[16px] mx-auto block rounded-md font-semibold hover:bg-[#cccccc] hover:text-[rgb(51,51,51)] transition-colors duration-500 shadow-[0_0_5px_5px_rgba(51,51,51,.5)]"
					@click="addProduct = true"
				>
					Add product
				</button>

				<OneProductComponent
					v-for="(product, index) in storeProducts.products"
					:key="product.id"
					:product="product"
					:index="index"
					:fav="false"
					@favProduct="showFavPopup"
				/>
			</div>

			<!-- Fav products section -->
			<div class="products-box" v-if="!underline">
				<span
					class="text-[rgb(239,68,68)] font-semibold mb-[16px] block text-center"
					v-if="storeProducts.favProducts.length == 0"
					>No favorites products were added</span
				>
				<OneProductComponent
					v-for="(product, index) in storeProducts.favProducts"
					:key="product.id"
					:product="product"
					:index="index"
					:fav="true"
				/>
			</div>
		</div>
	</div>

	<AddProductPopup v-model="addProduct" />
	<FavProductPopup v-model="showPopup" />
</template>

<script setup>
//imports
import { ref, computed } from 'vue'
import { useStoreProducts } from '../store/storeProducts'
import AddProductPopup from './AddProductPopup.vue'
import OneProductComponent from './OneProductComponent.vue'
import FavProductPopup from './FavProductPopup.vue'

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

const favProducts = computed(() => {
	return storeProducts.favProducts
})

//search value
const searchValue = ref('')

const products = ref([])
let temporaryArr = ref([])
temporaryArr.value = storeProducts.products

const favoritesProducts = ref([])
let temporaryFavArr = ref([])
temporaryFavArr.value = storeProducts.favProducts

const searchProducts = () => {
	if (underline.value) {
		storeProducts.products = temporaryArr.value
		products.value = storeProducts.products
		storeProducts.products = []
		if (searchValue.value !== '') {
			products.value.forEach(el => {
				if (el.name.toLowerCase().includes(searchValue.value.toLocaleLowerCase())) {
					storeProducts.products.push(el)
				}
			})
		} else {
			storeProducts.products = temporaryArr.value
		}
	} else {
		storeProducts.favProducts = temporaryFavArr.value
		favoritesProducts.value = storeProducts.favProducts
		storeProducts.favProducts = []
		if (searchValue.value !== '') {
			favoritesProducts.value.forEach(el => {
				if (el.name.toLowerCase().includes(searchValue.value.toLocaleLowerCase())) {
					storeProducts.favProducts.push(el)
				}
			})
		} else {
			storeProducts.favProducts = temporaryFavArr.value
		}
	}
}

const showPopup = ref(false)

const showFavPopup = () => {
	showPopup.value = true
	underline.value = false
	setTimeout(disablePopup, 1500)
}

const disablePopup = () => {
	showPopup.value = false
}
</script>

<style lang="scss"></style>
