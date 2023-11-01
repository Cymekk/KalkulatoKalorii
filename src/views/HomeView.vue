<template>
	<NavbarComponent />
	<MainComponent v-if="storeCalories.isLoaded" />
	<MacrosComponent v-if="storeCalories.isLoaded" />
	<LoaderComponent v-if="!storeCalories.isLoaded" />
	<ResetTestAccountComponent
		v-if="storeAuth.popup && storeAuth.testAccount && storeCalories.calories.totalCalories !== 0"
	/>
</template>

<script setup>
//imports
import NavbarComponent from '../components/NavbarComponent.vue'
import MainComponent from '../components/MainComponent.vue'
import MacrosComponent from '../components/MacrosComponent.vue'
import ResetTestAccountComponent from '../components/ResetTestAccountComponent.vue'
import { useStoreAuth } from '../store/storeAuth'
import { useStoreCalories } from '../store/storeCalories'
import LoaderComponent from '../components/LoaderComponent.vue'

//store
const storeAuth = useStoreAuth()
const storeCalories = useStoreCalories()
</script>

<style lang="scss" scoped></style>
