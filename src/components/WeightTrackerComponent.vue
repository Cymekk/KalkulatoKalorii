<template>
	<div
		class="weight flex flex-col items-center justify-center my-[32px] mx-auto w-[250px] h-[250px] rounded-full bg-[#4D4D4D] shadow-[0_0_15px_5px_rgba(77,77,77,1)] text-[#ccc]"
	>
		<span class="font-bold text-[45px]">{{ currentWeight.weight }}kg</span>
		<span>current weight</span>
	</div>

	<form
		class="rounded-md overflow-hidden w-full"
		:class="{ 'border-2 border-red-500 shadow-[0_0_5px_5px_rgba(239,68,68,.5)]': weightInputError }"
		@submit.prevent="validateForm"
	>
		<input type="number" step="0.1" class="p-[5px] w-[60%]" v-model="weightInput" />
		<input type="submit" value="Add weight" class="w-[40%] py-[5px] bg-[#4d4d4d] text-[#ccc]" />
	</form>

	<p class="error text-red-500 font-semibold block text-center mt-[12px]" v-if="weightInputError">
		Please enter weight value from range 1kg to 199 kg
	</p>

	<div v-if="weights && weights.length > 0">
		<h3 class="font-semibold text-[#ccc] text-center text-[20px] my-[24px]">Weight Chart</h3>

		<div class="canvas-box bg-[#fff] p-[16px] rounded-md">
			<canvas ref="weightChartEl"></canvas>
		</div>

		<div class="weight-history">
			<h3 class="font-semibold text-[#ccc] text-center text-[20px] my-[24px]">Weight History</h3>
			<ul>
				<li
					v-for="(weight, index) in storeTrackers.weightsArray"
					:key="index"
					class="flex justify-between items-center p-[8px]"
					:class="{
						'rounded-t-md': index == 0,
						'rounded-b-md': index + 1 == storeTrackers.weightsArray.length,
						'bg-[#ccc]': index % 2 == 0,
						'bg-[#aaa]': index % 2 !== 0,
					}"
				>
					<span>{{ weight.weight }}kg</span>
					<small>{{ new Date(weight.date).toLocaleDateString() }}</small>
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
const weights = computed(() => {
	return storeTrackers.weightsArray
})
const weightChartEl = ref(null)
const weightChart = shallowRef(null)
const weightInput = ref('')
const currentWeight = computed(() => {
	return weights.value[weights.value.length - 1] || { weight: 0 }
})

const weightInputError = ref(false)
const validateForm = () => {
	if (weightInput.value < 1 || weightInput.value > 199) {
		weightInputError.value = true
	} else {
		weightInputError.value = false
		addWeight()
	}
}

const addWeight = () => {
	const date = new Date().getTime()
	storeTrackers.addWeight(weightInput, date)
	weightInput.value = ''
}

watch(
	weights,
	newWeights => {
		const ws = [...newWeights]

		if (weightChart.value) {
			weightChart.value.data.labels = ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString())
			weightChart.value.data.datasets[0].data = ws.sort((a, b) => a.date - b.date).map(w => w.weight)
			weightChart.value.update()

			return
		}

		nextTick(() => {
			weightChart.value = new Chart(weightChartEl.value.getContext('2d'), {
				type: 'line',
				data: {
					labels: ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString()),
					datasets: [
						{
							label: 'Weight',
							data: ws.sort((a, b) => a.date - b.date).map(w => w.weight),
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
	},
	{ deep: true }
)

const showChart = () => {
	if (weights.value.length > 0) {
		const ws = [...weights.value]

		if (weightChart.value) {
			weightChart.value.data.labels = ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString())
			weightChart.value.data.datasets[0].data = ws.sort((a, b) => a.date - b.date).map(w => w.weight)
			weightChart.value.update()

			return
		}

		nextTick(() => {
			weightChart.value = new Chart(weightChartEl.value.getContext('2d'), {
				type: 'line',
				data: {
					labels: ws.sort((a, b) => a.date - b.date).map(w => new Date(w.date).toLocaleDateString()),
					datasets: [
						{
							label: 'Weight',
							data: ws.sort((a, b) => a.date - b.date).map(w => w.weight),
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
