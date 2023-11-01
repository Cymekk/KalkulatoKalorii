<template>
	<div
		class="fixed bottom-0 p-[32px] pb-0 w-full transition-opacity duration-500"
		:class="{ 'opacity-0': !modelValue, 'opcaity-100': modelValue }"
	>
		<div class="box container max-w-[600px] bg-[#d9d9d9] p-[16px] rounded-t-md text-center">
			Favorites product has been added
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: Boolean,
	},
})
</script>

<style lang="scss" scoped></style>
