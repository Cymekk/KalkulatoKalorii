import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import HomeView from '../views/HomeView.vue'
import CalcCaloriesView from '../views/CalcCaloriesView.vue'
import AddProductView from '../views/AddProductView.vue'
import { useStoreAuth } from '../store/storeAuth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			name: 'auth',
			component: AuthView,
		},
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/calccalories',
			name: 'calccalories',
			component: CalcCaloriesView,
		},
		{
			path: '/addproduct',
			name: 'addproductview',
			component: AddProductView,
		},
	],
})

router.beforeEach(async (to, from) => {
	const storeAuth = useStoreAuth()
	if (!storeAuth.user.id && to.name !== 'auth') {
		return { name: 'auth' }
	}

	if (storeAuth.user.id && to.name === 'auth') {
		return false
	}
})

export default router
