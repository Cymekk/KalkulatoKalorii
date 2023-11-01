<template>
	<div class="shadow flex items-center justify-center fixed inset-0 bg-black/50">
		<div
			class="body w-4/5 max-w-[400px] flex flex-col justify-center space-y-[16px] bg-[#cccccc] p-[32px] rounded-md shadow-[0_0_5px_5px_rgba(204,204,204,.5)]"
		>
			<p class="text-center">
				Looks like someone else provided some data on test account. Do you want to reset all data or leave it?
			</p>
			<div class="buttons flex items-center justify-center">
				<button
					@click="closePopup"
					class="bg-[#aaa] text-[#111] rounded-md px-4 py-2 hover:text-[#aaa] hover:bg-[#111] transition-colors duration-500"
				>
					Leave it
				</button>
				<button
					@click="resetData"
					class="bg-[#333] text-[#ccc] ml-[8px] rounded-md px-4 py-2 hover:text-[#333] hover:bg-[#bbb] transition-colors duration-500"
				>
					Reset
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
//imports
import { useStoreAuth } from '../store/storeAuth'
import { useRouter } from 'vue-router'

//store
const storeAuth = useStoreAuth()

//router
const router = useRouter()

//closepopup function
const closePopup = () => {
	storeAuth.popup = false
}

//reset all test account data
const resetData = () => {
	storeAuth.resetData()
	router.push('/calccalories')
	closePopup()
}
</script>

<style lang="scss" scoped></style>
