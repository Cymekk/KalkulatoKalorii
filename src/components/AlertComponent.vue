<template>
	<div class="shadow flex items-center justify-center fixed inset-0 bg-black/50">
		<div
			class="body w-4/5 max-w-[400px] flex flex-col items-center justify-center space-y-[16px] bg-[#cccccc] p-[32px] rounded-md shadow-[0_0_5px_5px_rgba(204,204,204,.5)]"
		>
			<img src="../assets/icons/alert-circle.svg" alt="alert icon" class="w-[150px]" />

			<p class="text-center">To add the products you eat, you need to calculate your caloric needs</p>
			<RouterLink to="/calccalories"><span class="underline font-semibold">Calculate caloric need</span></RouterLink>
		</div>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
