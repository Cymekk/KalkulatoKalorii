<template>
	<div
		class="shadow fixed z-10 inset-0 bg-black/50 flex items-center justify-center transition-transform duration-700"
		:class="{
			'-translate-y-[150%] opacity-0': !modelValue,
			'translate-y-[0] opacity-100': modelValue,
		}"
	>
		<div
			class="menu-body relative bg-[#CCCCCC] p-[32px] rounded-md shadow-[0_0_5px_1px_rgba(230,230,230,1)]"
			ref="targetRef"
		>
			<ul class="space-y-[16px] text-center text-[#333333] font-semibold text-[20px]">
				<li class="cursor-pointer" @click="goToHome">Home</li>
				<li class="cursor-pointer" @click="goToCalcCalories">Improve caloric needs</li>
				<li class="cursor-pointer" @click="goToTrackers">Trackers</li>
			</ul>
			<button class="absolute top-0 right-[30px] p-[5px]" @click="logout">
				<img src="../assets/icons/log-out.svg" alt="logout icon" />
			</button>
			<button class="absolute top-0 right-0 p-[5px]" @click="closeNav">
				<img src="../assets/icons/close.svg" alt="X icon" />
			</button>
		</div>
	</div>
</template>

<script setup>
//imports
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '../store/storeAuth'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//store
const storeAuth = useStoreAuth()

//reference for popupbody
const targetRef = ref(null)

//props
const props = defineProps({
	modelValue: {
		type: Boolean,
	},
})

//emit
const emit = defineEmits(['update:modelValue'])

//closing navigation function
const closeNav = () => {
	emit('update:modelValue', false)
}

//function which close navigation on click outside popup boyd
onClickOutside(targetRef, closeNav)

//logout function
const logout = () => {
	storeAuth.logoutUser()
}

//Router pushing

//go to home
const goToHome = () => {
	closeNav()
	router.push('/')
}

//go to calc calories view
const goToCalcCalories = () => {
	closeNav()
	router.push('/calccalories')
}

//go to trackers

const goToTrackers = () => {
	closeNav()
	router.push('/trackers')
}
</script>

<style lang="scss" scoped></style>
