<template>
	<div
		class="fixed inset-0 bg-black/50 flex items-center justify-center transition-transform duration-700"
		:class="{ '-translate-y-[100%]': !props.modelValue, 'translate-y-[0]': props.modelValue }"
	>
		<div
			class="popup-body flex flex-col justify-center space-y-[16px] w-[80%] max-w-[400px] bg-[#cccccc] p-[32px] rounded-md shadow-[0_0_5px_5px_rgba(204,204,204,.5)] max-h-[90vh] overflow-y-scroll"
		>
			<div class="input-box" :class="{ 'text-[#EF4444] font-semibold': v$.name.$error }">
				<label>Product name</label>
				<input
					type="text"
					class="rounded-md p-[5px] focus:outline-none block w-full"
					:class="{ 'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.name.$error }"
					v-model="productDetails.name"
				/>
				<span v-if="v$.name.$error">Product name cannot be blank</span>
			</div>

			<div class="input-box" :class="{ 'text-[#EF4444] font-semibold': v$.calories.$error }">
				<label>Calories in 100g</label>
				<input
					type="number"
					class="rounded-md p-[5px] focus:outline-none block w-full"
					:class="{
						'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.calories.$error,
					}"
					v-model="productDetails.calories"
				/>
				<span v-if="v$.calories.$error">Calories cannot be blank and value need to be greater than 0</span>
			</div>

			<div class="input-box" :class="{ 'text-[#EF4444] font-semibold': v$.carbs.$error }">
				<label>Carbs in 100g of product</label>
				<input
					type="number"
					class="rounded-md p-[5px] focus:outline-none block w-full"
					:class="{
						'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.carbs.$error,
					}"
					v-model="productDetails.carbs"
				/>
				<span v-if="v$.carbs.$error">Carbs cannot be blank and value need to be greater than 0</span>
			</div>
			<div class="input-box" :class="{ 'text-[#EF4444] font-semibold': v$.proteins.$error }">
				<label>Proteins in 100g of product</label>
				<input
					type="number"
					class="rounded-md p-[5px] focus:outline-none block w-full"
					:class="{
						'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.proteins.$error,
					}"
					v-model="productDetails.proteins"
				/>
				<span v-if="v$.proteins.$error">Proteins cannot be blank and value need to be greater than 0</span>
			</div>
			<div class="input-box" :class="{ 'text-[#EF4444] font-semibold': v$.fats.$error }">
				<label>Fats in 100g of product</label>
				<input
					type="number"
					class="rounded-md p-[5px] focus:outline-none block w-full"
					:class="{
						'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': v$.fats.$error,
					}"
					v-model="productDetails.fats"
				/>
				<span v-if="v$.fats.$error">Fats cannot be blank and value need to be greater than 0</span>
			</div>

			<div class="buttons flex justify-evenly">
				<button
					class="bg-[#aaa] text-[#111] rounded-md px-4 py-2 hover:text-[#aaa] hover:bg-[#111] transition-colors duration-500"
					@click="closePopup"
				>
					Cancel
				</button>
				<button
					class="bg-[#333] text-[#ccc] rounded-md px-4 py-2 hover:text-[#333] hover:bg-[#bbb] transition-colors duration-500"
					@click="addProduct"
				>
					Add Product
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { reactive, computed } from 'vue'
import { required, minValue, maxValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStoreProducts } from '../store/storeProducts'

//store
const storeProducts = useStoreProducts()

//props
const props = defineProps({
	modelValue: {
		type: Boolean,
	},
})

//emits
const emit = defineEmits(['update:modelValue'])

//close popup function
const closePopup = () => {
	emit('update:modelValue', false)
}

//reactive variable which store product details
const productDetails = reactive({
	name: '',
	calories: '',
	carbs: '',
	proteins: '',
	fats: '',
})

//rules for validate inputs
const rules = computed(() => {
	return {
		name: {
			required,
		},
		calories: {
			required,
			maxValue: maxValue(1000),
			minValue: minValue(1),
		},
		carbs: {
			required,
			maxValue: maxValue(1000),
			minValue: minValue(0),
		},
		proteins: {
			required,
			maxValue: maxValue(1000),
			minValue: minValue(0),
		},
		fats: {
			required,
			maxValue: maxValue(1000),
			minValue: minValue(0),
		},
	}
})

//validate form
const v$ = useVuelidate(rules, productDetails)

//add product function
const addProduct = () => {
	v$.value.$validate()
	if (!v$.value.$error) {
		storeProducts.addProduct(productDetails)
		closePopup()
	}
}
</script>

<style lang="scss" scoped>
.popup-body::-webkit-scrollbar {
	display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.popup-body {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
