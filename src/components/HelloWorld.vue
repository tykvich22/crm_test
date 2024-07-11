<script setup lang="ts">
defineProps<{
	msg: string;
}>();
</script>

<template>
	<div>
		<h1>{{ msg }}</h1>
	</div>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
}
</style>
