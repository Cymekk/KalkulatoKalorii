<template>
	<div class="product-db p-[16px]" :class="{ 'bg-[#ccc]': index % 2 == 0, 'bg-[#eee]': index % 2 !== 0 }">
		<div class="product-header flex justify-between items-center mb-[16px]">
			<div class="name">
				<span class="font-semibold">{{ product.name }}</span>
			</div>
			<div class="buttons flex space-x-[6px]">
				<button
					v-if="!fav"
					class="p-[5px] rounded-md bg-[#333333]"
					:class="{ hidden: favProduct.length !== 0 }"
					@click="addToFavourites(product)"
				>
					<img src="../assets/icons/heart.svg" alt="heart icon" />
				</button>
				<button v-if="fav" class="p-[5px] rounded-md bg-[#333333]" @click="removeFavProduct()">
					<img src="../assets/icons/heart-filled.svg" alt="heart filled icon" />
				</button>
				<button class="p-[5px] rounded-md bg-[#333333]" @click="isVisible = true">
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
	<AddEatenProductPopup :product="product" v-model="isVisible" />
</template>

<script setup>
//imports
import { ref, computed, onMounted } from 'vue'
import AddEatenProductPopup from './AddEatenProductPopup.vue'
import { useStoreProducts } from '../store/storeProducts'

//store
const storeProducts = useStoreProducts()

//props
const props = defineProps({
	product: {
		type: Object,
	},
	index: {
		type: Number,
	},
	fav: {
		type: Boolean,
	},
	favProducts: {
		type: Array,
	},
})

//emits
const emit = defineEmits(['favProduct'])

//variable for showing add eaten product popup
const isVisible = ref(false)

//add product to favourites
const addToFavourites = product => {
	storeProducts.addFavProduct(product)
	emit('favProduct')
}

//remove fav product
const removeFavProduct = () => {
	storeProducts.removeFavProduct(props.product.id)
}

const favProducts = computed(() => {
	return storeProducts.favProducts
})

const favProduct = favProducts.value.filter(el => el.uuid == props.product.uuid)
</script>

<style lang="scss" scoped></style>
