<template>
	<NavbarComponent />
	<div class="container p-[32px] pt-0 max-w-[600px]">
		<div class="header text-[#cccccc] flex items-center justify-center font-semibold">
			<span
				class="px-4 py-2 cursor-pointer"
				:class="{ 'border-b-2 border-[#CCCCCC]': weightTracker }"
				@click="weightTracker = true"
				>Weight Tracker</span
			>
			<span
				class="px-4 py-2 cursor-pointer"
				:class="{ 'border-b-2 border-[#CCCCCC]': !weightTracker }"
				@click="weightTracker = false"
				>Waist Tracker</span
			>
		</div>

		<WeightTrackerComponent v-if="weightTracker" />
		<WaistTrackerComponent v-if="!weightTracker" />
	</div>
</template>

<script setup>
//imports
import { ref } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import WeightTrackerComponent from '../components/WeightTrackerComponent.vue'
import WaistTrackerComponent from '../components/WaistTrackerComponent.vue'

const weightTracker = ref(true)
</script>

<style lang="scss" scoped></style>
