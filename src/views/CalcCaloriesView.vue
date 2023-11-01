<template>
	<NavbarComponent />
	<div class="container max-w-[600px] p-[32px] pt-0 text-[#d9d9d9] flex flex-col space-y-[16px]">
		<p>Thank you for choosing our apllication, We hope that our product will help you to reach your goals</p>
		<p>At beginning we need to calculate your caloric need, you can choose between to options</p>

		<div class="choose flex justify-center">
			<span
				class="font-semibold cursor-pointer"
				:class="{ 'border-b-2': whichWay === 'Automatically' }"
				@click="showValue($event)"
				>Automatically</span
			>
			<span
				class="font-semibold ml-[16px] cursor-pointer"
				:class="{ 'border-b-2': whichWay === 'Manually' }"
				@click="showValue($event)"
				>Manually</span
			>
		</div>

		<AutoCalcComponent v-if="whichWay === 'Automatically'" />
		<ManuallyCalcComponent v-if="whichWay === 'Manually'" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import AutoCalcComponent from '../components/AutoCalcComponent.vue'
import ManuallyCalcComponent from '../components/ManuallyCalcComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
let whichWay = ref('')

const showValue = e => {
	whichWay.value = e.target.textContent
}
</script>

<style lang="scss" scoped></style>
