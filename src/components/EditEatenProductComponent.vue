<template>
	<div
		class="shadow fixed inset-0 z-20 bg-black/50 flex items-center justify-center transition-transform duration-500"
		:class="{ '-translate-y-[150%] opacity-0': !modelValue, 'translate-y-0 opacity-100': modelValue }"
	>
		<div
			class="body w-[80%] max-w-[400px] bg-[#404040] p-[32px] rounded-md text-[#D9D9D9] shadow-[0_0_5px_1px_rgba(217,217,217,.5)] flex flex-col space-y-[16px]"
			ref="targetRef"
		>
			<h2 class="font-bold text-[20px]">Edit Product</h2>
			<p>
				Product name: <span class="font-semibold">{{ product.name }}</span>
			</p>

			<div class="input-box">
				<input
					type="number"
					class="p-[5px] rounded-md w-full text-black"
					:class="{ 'border-[1px] border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': isError }"
					placeholder="Provide new weight"
					v-model="weight"
				/>
				<span class="block text-center text-[#EF4444] font-semibold" v-if="isError"
					>Weight value should be grater than 0</span
				>
			</div>

			<div class="buttons mx-auto">
				<button
					class="px-6 py-3 bg-[#aaa] text-[#111] rounded-md hover:text-[#aaa] hover:bg-[#111] transition-colors duration-500"
					@click="closePopup"
				>
					Cancel
				</button>
				<button
					class="px-6 py-3 ml-[16px] bg-[#333] text-[#ccc] rounded-md hover:text-[#333] hover:bg-[#bbb] transition-colors duration-500"
					@click="editProduct"
				>
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { ref } from 'vue'
import { useEatenProducts } from '../store/storeEatenProducts'
import { useStoreProducts } from '../store/storeProducts'
import { onClickOutside } from '@vueuse/core'

//stores
const eatenProducts = useEatenProducts()
const storeProducts = useStoreProducts()

//props
const props = defineProps({
	product: {
		type: Object,
	},
	modelValue: {
		type: Boolean,
	},
})

//emit
const emit = defineEmits(['update:modelValue'])

//variable handling input error
const isError = ref(false)

//closing popup function
const closePopup = () => {
	emit('update:modelValue', false)
	isError.value = false
}

//variable storing weight value
const weight = ref('')

//edit eaten product function
const editProduct = () => {
	if (weight.value === '' || weight.value <= 0) {
		isError.value = true
	} else {
		isError.value = false
		const product = storeProducts.products.filter(el => el.id === props.product.uid)
		eatenProducts.editEatenProduct(product[0], weight.value, props.product.id)
		closePopup()
	}
}

//reference to popup body
const targetRef = ref(null)

//closing popup on clicking outside body
onClickOutside(targetRef, closePopup)
</script>

<style lang="scss" scoped></style>
