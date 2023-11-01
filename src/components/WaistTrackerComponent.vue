<template>
	<div
		class="weight flex flex-col items-center justify-center my-[32px] mx-auto w-[250px] h-[250px] rounded-full bg-[#4D4D4D] shadow-[0_0_15px_5px_rgba(77,77,77,1)] text-[#ccc]"
	>
		<span class="font-bold text-[45px]">{{ currentWeist.waist }}cm</span>
		<span>current weist</span>
	</div>

	<form
		class="rounded-md overflow-hidden w-full"
		:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': waistInputError }"
		@submit.prevent="validateForm"
	>
		<input type="number" step="0.1" class="p-[5px] w-[60%]" v-model="waistInput" />
		<input type="submit" value="Add weist" class="w-[40%] py-[5px] bg-[#4d4d4d] text-[#ccc]" />
	</form>

	<p class="error text-red-500 font-semibold block text-center mt-[12px]" v-if="waistInputError">
		Please enter waist value from range 1cm to 199cm
	</p>

	<div v-if="waist && waist.length > 0">
		<h3 class="font-semibold text-[#ccc] text-center text-[20px] my-[24px]">Waist Chart</h3>

		<div class="canvas-box bg-[#fff] p-[16px] rounded-md">
			<canvas ref="waistChartRef"></canvas>
		</div>

		<div class="weight-history">
			<h3 class="font-semibold text-[#ccc] text-center text-[20px] my-[24px]">Waist History</h3>
			<ul>
				<li
					v-for="(waist, index) in storeTrackers.waistsArray"
					:key="index"
					class="flex justify-between items-center p-[8px]"
					:class="{
						'rounded-t-md': index == 0,
						'rounded-b-md': index + 1 == storeTrackers.waistsArray.length,
						'bg-[#ccc]': index % 2 == 0,
						'bg-[#aaa]': index % 2 !== 0,
					}"
				>
					<span>{{ waist.waist }}cm</span>
					<small>{{ new Date(waist.date).toLocaleDateString() }}</small>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup>
//imports
import { ref, shallowRef, computed, watch, nextTick, onMounted } from 'vue'
import { useStoreTracker } from '../store/storeTrackers'
import Chart from 'chart.js/auto'

//store
const storeTrackers = useStoreTracker()
const waist = computed(() => {
	return storeTrackers.waistsArray
})
const waistChartRef = ref(null)
const waistsChart = shallowRef(null)
const waistInput = ref('')
const currentWeist = computed(() => {
	return waist.value[waist.value.length - 1] || { waist: 0 }
})

const waistInputError = ref(false)
const validateForm = () => {
	if (waistInput.value < 1 || waistInput.value > 199) {
		waistInputError.value = true
	} else {
		waistInputError.value = false
		addWeist()
	}
}

const addWeist = () => {
	const date = new Date().getTime()
	storeTrackers.addWaist(waistInput, date)
	waistInput.value = ''
}

watch(
	waist,
	newWaist => {
		console.log('nowy pomiar')
		const ws = [...newWaist]

		if (waistsChart.value) {
			waistsChart.value.data.labels = ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString())
			waistsChart.value.data.datasets[0].data = ws.sort((a, b) => a.date - b.date).map(w => w.waist)
			waistsChart.value.update()

			return
		}

		nextTick(() => {
			waistsChart.value = new Chart(waistChartRef.value.getContext('2d'), {
				type: 'line',
				data: {
					labels: ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString()),
					datasets: [
						{
							label: 'Waist',
							data: ws.sort((a, b) => a.date - b.date).map(w => w.waist),
							backgroundColor: 'rgba(64, 64, 64, 0.6)',
							borderColor: 'rgb(64, 64, 64)',
							borderWidth: 1,
							fill: true,
						},
					],
				},

				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			})
		})
	},
	{ deep: true }
)

const showChart = () => {
	if (waist.value.length > 0) {
		const ws = [...waist.value]

		if (waistsChart.value) {
			waistsChart.value.data.labels = ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString())
			waistsChart.value.data.datasets[0].data = ws.sort((a, b) => a.date - b.date).map(w => w.waist)
			waistsChart.value.update()

			return
		}

		nextTick(() => {
			waistsChart.value = new Chart(waistChartRef.value.getContext('2d'), {
				type: 'line',
				data: {
					labels: ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString()),
					datasets: [
						{
							label: 'Waist',
							data: ws.sort((a, b) => a.date - b.date).map(w => w.waist),
							backgroundColor: 'rgba(64, 64, 64, 0.6)',
							borderColor: 'rgb(64, 64, 64)',
							borderWidth: 0.5,
							fill: true,
						},
					],
				},

				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			})
		})
	}
}

onMounted(() => {
	showChart()
})
</script>
