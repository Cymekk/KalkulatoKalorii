<template>
	<div class="shadow flex items-center justify-center fixed inset-0 bg-black/50">
		<div
			class="popup-body p-[32px] bg-[#ccc] w-[80%] max-w-[400px] rounded-md shadow-[0_0_2px_2px_rgba(204,204,204,.5)]"
		>
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

			<input type="number" placeholder="Add product weight" class="p-[5px] rounded-md w-full" />
            <div class="buttons">
                <button>Cancel</button>
                <button>Add</button>
            </div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	product: {
		type: Object,
	},
})

console.log(props.product)
</script>

<style lang="scss" scoped></style>
