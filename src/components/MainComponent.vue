<template>
	<main class="main container max-w-[600px] p-[32px] pt-0">
		<div class="products-container bg-[#d9d9d9] p-[16px] rounded-md max-h-[50vh] overflow-y-scroll">
			<CalendarComponent @send-date="showDate" />

			<!-- Breakfest box -->
			<div class="food-box">
				<button
					class="food-box-btn transition-transform duration-500"
					:class="{ 'rotate-180': eatenProducts.breakfestBox }"
					@click="eatenProducts.showBreakfestBox"
				>
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Breakfest</h3>

				<button class="food-box-btn" @click="goToAddProduct($event)">
					<img src="../assets/icons/plus.svg" alt="plus icon" />
				</button>
			</div>
			<div class="mb-[16px]" v-if="eatenProducts.breakfestBox">
				<EatenProductComponent
					v-for="(item, index) in eatenProducts.Breakfest"
					:key="item.id"
					:product="item"
					:index="index"
				/>
			</div>
			<span
				class="mb-[16px] block text-center text-red-500 font-semibold"
				v-if="eatenProducts.Breakfest.length == 0 && eatenProducts.breakfestBox"
				>No eaten products added into breakfest</span
			>

			<!-- Lunch box -->
			<div class="food-box">
				<button
					class="food-box-btn transition-transform duration-500"
					:class="{ 'rotate-180': eatenProducts.lunchBox }"
					@click="eatenProducts.showLunchBox"
				>
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Lunch</h3>

				<button class="food-box-btn" @click="goToAddProduct($event)">
					<img src="../assets/icons/plus.svg" alt="plus icon" />
				</button>
			</div>
			<div class="mb-[16px]" v-if="eatenProducts.lunchBox">
				<EatenProductComponent
					v-for="(item, index) in eatenProducts.Lunch"
					:key="item.id"
					:product="item"
					:index="index"
				/>
			</div>

			<span
				class="mb-[16px] block text-center text-red-500 font-semibold"
				v-if="eatenProducts.Lunch.length == 0 && eatenProducts.lunchBox"
				>No eaten products added into lunch</span
			>

			<!-- Snacks box -->
			<div class="food-box">
				<button
					class="food-box-btn transition-transform duration-500"
					:class="{ 'rotate-180': eatenProducts.snackBox }"
					@click="eatenProducts.showSnacksBox"
				>
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Snacks</h3>

				<button class="food-box-btn" @click="goToAddProduct($event)">
					<img src="../assets/icons/plus.svg" alt="plus icon" />
				</button>
			</div>
			<div class="mb-[16px]" v-if="eatenProducts.snackBox">
				<EatenProductComponent
					v-for="(item, index) in eatenProducts.Snacks"
					:key="item.id"
					:product="item"
					:index="index"
				/>
			</div>
			<span
				class="mb-[16px] block text-center text-red-500 font-semibold"
				v-if="eatenProducts.Snacks.length == 0 && eatenProducts.snackBox"
				>No eaten products added into snacks</span
			>

			<!-- Dinner -->
			<div class="food-box">
				<button
					class="food-box-btn transition-transform duration-500"
					:class="{ 'rotate-180': eatenProducts.dinnerBox }"
					@click="eatenProducts.showDinnerBox"
				>
					<img src="../assets/icons/chevron-down.svg" alt="chevron down icon" />
				</button>
				<h3 class="food-box-title">Dinner</h3>

				<button class="food-box-btn" @click="goToAddProduct($event)">
					<img src="../assets/icons/plus.svg" alt="plus icon" />
				</button>
			</div>
			<div class="mb-[16px]" v-if="eatenProducts.dinnerBox">
				<EatenProductComponent
					v-for="(item, index) in eatenProducts.Dinner"
					:key="item.id"
					:product="item"
					:index="index"
				/>
			</div>
			<span
				class="mb-[16px] block text-center text-red-500 font-semibold"
				v-if="eatenProducts.Dinner.length == 0 && eatenProducts.dinnerBox"
				>No eaten products added into dinner</span
			>
		</div>
	</main>
	<AlertComponent v-if="isError" />
</template>

<script setup>
//imports
import { onMounted, ref } from 'vue'
import CalendarComponent from './CalendarComponent.vue'
import EatenProductComponent from './EatenProductComponent.vue'
import { useRouter } from 'vue-router'
import { useEatenProducts } from '../store/storeEatenProducts'
import { useStoreCalories } from '../store/storeCalories'
import AlertComponent from './AlertComponent.vue'

//store
const eatenProducts = useEatenProducts()
const storeCalories = useStoreCalories()

//router
const router = useRouter()

//variable for storing date
let todayDate = ref(false)

//update date by child emit
function showDate(date) {
	todayDate.value = date
	eatenProducts.getEatenProducts(todayDate.value)
}

//checking that you calculate you caloric need first
const isError = ref(false)
const isTotalCalories = ref(false)

const checkTotalCalories = () => {
	if (storeCalories.calories.totalCalories === 0) {
		isTotalCalories.value = true
	} else {
		isTotalCalories.value = false
	}
}

//navigate to add product view and storing for which meal you will add product
const goToAddProduct = e => {
	checkTotalCalories()
	if (isTotalCalories.value) {
		isError.value = true
	} else {
		isError.value = false
		const parentElement = e.target.parentElement.parentElement
		const headerText = parentElement.querySelector('h3').textContent
		eatenProducts.assignMeal(headerText)
		router.push('/addproduct')
	}
}

onMounted(() => {
	storeCalories.getCaloriesFromDb()
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
