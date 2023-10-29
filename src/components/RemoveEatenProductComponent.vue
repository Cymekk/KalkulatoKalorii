<template>
	<div
		class="shadow fixed z-10 inset-0 bg-black/50 flex items-center justify-center transition-transform-opacity duration-500"
		:class="{
			'-translate-y-[150%] opacity-0': !modelValue,
			'translate-y-[0] opacity-100': modelValue,
		}">
		<div
			class="body w-[80%] max-w-[400px] bg-[#404040] p-[32px] rounded-md text-[#D9D9D9] shadow-[0_0_5px_1px_rgba(217,217,217,.5)] text-[18px] text-center">
			<h2 class="font-bold text-[22px] mb-[16px]">Remove Product</h2>
			<p>
				Are you sure that you want to delete
				<span class="font-semibold">{{ product.name.toLowerCase() }}</span> from
				<span class="font-semibold">{{ product.meal.toLowerCase() }}</span>
				section?
			</p>

			<div class="buttons flex items-center justify-center mt-[16px]">
				<button
					class="px-6 py-3 bg-[#aaa] text-[#111] rounded-md hover:text-[#aaa] hover:bg-[#111] transition-colors duration-500"
					@click="closePopup">
					NO
				</button>
				<button
					class="px-6 py-3 ml-[16px] bg-[#333] text-[#ccc] rounded-md hover:text-[#333] hover:bg-[#bbb] transition-colors duration-500"
					@click="removeProduct">
					YES
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { useEatenProducts } from "../store/storeEatenProducts"

//store
const eatenProducts = useEatenProducts()

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
const emit = defineEmits(["update:modelValue"])

//closing remove product popup
const closePopup = () => {
	emit("update:modelValue", false)
}

//remove product function
const removeProduct = () => {
	eatenProducts.removeEatenProduct(props.product.id)
}
</script>

<style lang="scss" scoped></style>
