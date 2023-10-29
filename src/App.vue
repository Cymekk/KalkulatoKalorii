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

</style>
