<template>
	<nav class="nav container p-[32px] flex items-center justify-between">
		<img src="../assets/icons/calculator.svg" alt="" />
		<h2 class="text-[#D9D9D9] text-[28px] text-center">Calories Calculator</h2>
		<div class="burger-btn w-[40px] h-[40px] flex flex-col justify-between" @click="showNav()">
			<span class="bar h-[3px] bg-[#D9D9D9] w-full"></span>
			<span class="bar h-[3px] bg-[#D9D9D9] w-full"></span>
			<span class="bar h-[3px] bg-[#D9D9D9] w-full"></span>
		</div>
	</nav>
	<Menucomponent v-model="menuActive" />
</template>

<script setup>
import { ref } from 'vue'
import Menucomponent from './MenuComponent.vue'

const menuActive = ref(false)

const showNav = () => {
	menuActive.value = true
}
</script>

<style lang="scss" scoped></style>
