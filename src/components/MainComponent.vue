<template>
	<main class="main container p-[32px] pt-0">
		<div class="products-container bg-[#d9d9d9] p-[16px] rounded-md max-h-[60vh] overflow-y-scroll">
			<CalendarComponent @send-date="showDate" />
			<div class="food-box">
				<button class="food-box-btn">
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Breakfest</h3>
				<RouterLink to="addproduct">
					<button class="food-box-btn">
						<img src="../assets/icons/plus.svg" alt="plus icon" />
					</button>
				</RouterLink>
			</div>
			<div class="food-box">
				<button class="food-box-btn">
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Lunch</h3>
				<RouterLink to="addproduct">
					<button class="food-box-btn">
						<img src="../assets/icons/plus.svg" alt="plus icon" />
					</button>
				</RouterLink>
			</div>
			<div class="food-box">
				<button class="food-box-btn">
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Snacks</h3>
				<RouterLink to="addproduct">
					<button class="food-box-btn">
						<img src="../assets/icons/plus.svg" alt="plus icon" />
					</button>
				</RouterLink>
			</div>
			<div class="food-box">
				<button class="food-box-btn">
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Dinner</h3>
				<RouterLink to="addproduct">
					<button class="food-box-btn">
						<img src="../assets/icons/plus.svg" alt="plus icon" />
					</button>
				</RouterLink>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref, watch } from 'vue'
import CalendarComponent from './CalendarComponent.vue'
import { RouterLink } from 'vue-router'

let todayDate = ref(false)

function showDate(date) {
	todayDate.value = date
}

watch(todayDate, (todayDate, newDate) => {
	console.log('nowa data')
})
</script>

<style lang="scss" scoped>
.food-box:last-child {
	margin-bottom: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.products-container::-webkit-scrollbar {
	display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.products-container {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
