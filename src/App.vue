<script setup>
import { onMounted } from 'vue'
import { useStoreAuth } from './store/storeAuth'

const storeAuth = useStoreAuth()

onMounted(() => {
	storeAuth.init()
})
</script>

<template>
	<RouterView />
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
