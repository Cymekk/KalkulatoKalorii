<template>
	<div
		class="shadow fixed inset-0 bg-black/50 flex items-center justify-center transition-transform duration-700"
		:class="{ '-translate-y-[150%] opacity-0': !modelValue, 'translate-y-[0] opacity-100': modelValue }"
	>
		<div
			class="menu-body relative bg-[#CCCCCC] p-[32px] rounded-md shadow-[0_0_5px_1px_rgba(230,230,230,1)]"
			ref="targetRef"
		>
			<ul class="space-y-[16px] text-center text-[#333333] font-semibold text-[20px]">
				<li><RouterLink to="/">Home</RouterLink></li>
				<li><RouterLink to="/calccalories">Improve caloric needs</RouterLink></li>
				<li>Weight tracker</li>
			</ul>
			<button class="absolute top-0 right-0 p-[5px]" @click="logout">
				<img src="../assets/icons/log-out.svg" alt="logout icon" />
			</button>
		</div>
	</div>
</template>

<script setup>
//imports
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '../store/storeAuth'

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
</script>

<style lang="scss" scoped></style>
