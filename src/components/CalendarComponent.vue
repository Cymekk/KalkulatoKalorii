<template>
	<div class="mb-[16px] flex items-center justify-between">
		<button class="p-[5px] bg-[#333333] rounded-md" @click="changeDate(-86400000)">
			<img src="../assets/icons/arrow-left.svg" alt="left arrow icon" />
		</button>
		<input
			type="date"
			id="calendar"
			class="focus:outline-none rounded-md p-[5px] shadow-[0_0_2px_2px_rgba(0,0,0,.5)] font-semibold"
			min="2023-01-01"
			max="2100-12-31"
			v-model="today"
			@change="sendDate"
		/>
		<button class="p-[5px] bg-[#333333] rounded-md" @click="changeDate(86400000)">
			<img src="../assets/icons/arrow-right.svg" alt="left arrow icon" />
		</button>
	</div>
</template>

<script setup>
//imports
import { onMounted, ref } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'

const emit = defineEmits(['sendDate'])

//variables for storing date
const today = ref('')
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD')
today.value = formatted.value

//variable for storing INPUT HTML tag
let calendar

//download input html tag into calendar variable
onMounted(() => {
	calendar = document.querySelector('#calendar')
})

//function for changind days
const changeDate = dateOffset => {
	const newDate = useDateFormat(new Date(new Date(today.value).getTime() + dateOffset), 'YYYY-MM-DD')
	today.value = newDate.value
	sendDate()
}

//function which emit new calendar value to parent component
const sendDate = () => {
	emit('sendDate', calendar.value)
}
</script>

<style lang="scss" scoped></style>
