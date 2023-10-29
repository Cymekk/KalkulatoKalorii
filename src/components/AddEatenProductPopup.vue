<template>
	<div
		class="shadow flex items-center justify-center fixed inset-0 bg-black/50 transition-transform duration-500"
		:class="{
			'-translate-y-[100%]': !modelValue,
			'translate-y-[0]': modelValue,
		}">
		<div
			class="popup-body p-[32px] bg-[#ccc] w-[80%] max-w-[400px] rounded-md shadow-[0_0_2px_2px_rgba(204,204,204,.5)]"
			ref="targetRef">
			<div class="header">
				Product name: <span class="font-semibold">{{ product.name }}</span>
			</div>

			<div class="product-details my-[16px]">
				<p class="text-center">Macros in 100g of product:</p>
				<div class="macros flex justify-between">
					<p>
						KCAL: <span class="font-semibold">{{ product.calories }}</span>
					</p>
					<p>
						C: <span class="font-semibold">{{ product.calories }}</span>
					</p>
					<p>
						P: <span class="font-semibold">{{ product.calories }}</span>
					</p>
					<p>
						F: <span class="font-semibold">{{ product.calories }}</span>
					</p>
				</div>
			</div>

			<input
				type="number"
				placeholder="Add product weight in grams"
				class="p-[5px] rounded-md w-full"
				:class="{
					'border-[rgb(239,68,68)] shadow-[0_0_5px_5px_rgba(239,68,68,.5)]':
						isError,
				}"
				v-model="weightInput" />
			<span
				v-if="isError"
				class="text-center block text-[rgb(239,68,68)] font-semibold"
				>Weight value should be greater than 0</span
			>
			<div class="buttons flex justify-center space-x-[16px] mt-[16px]">
				<button
					class="px-4 py-2 bg-[#aaa] text-[#111] rounded-md hover:text-[#aaa] hover:bg-[#111] transition-colors duration-500"
					@click="closePopup">
					Cancel
				</button>
				<button
					class="px-4 py-2 bg-[#333] text-[#ccc] rounded-md hover:text-[#333] hover:bg-[#bbb] transition-colors duration-500s"
					@click="addEatenProduct">
					Add
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { ref } from "vue"
import { onClickOutside } from "@vueuse/core"
import { useEatenProducts } from "../store/storeEatenProducts"

//store
const eatenProducts = useEatenProducts()

//Props
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

//function which closing popup
const closePopup = () => {
	weightInput.value = ""
	emit("update:modelValue", false)
	isError.value = false
}

//reference to popupbody
const targetRef = ref(null)

//closing popup on clicking outside popupbody
onClickOutside(targetRef, closePopup)

//variable for storing product weight input
const weightInput = ref("")

//variable for showing weight input error
const isError = ref(false)

//adding "Eaten Products"
const addEatenProduct = () => {
	if (weightInput.value <= 0 || weightInput.value === "") {
		isError.value = true
	} else {
		isError.value = false
		eatenProducts.addEatenProduct(props.product, weightInput.value)
	}
}
</script>

<style lang="scss" scoped></style>
