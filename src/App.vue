<script setup lang="ts">
import { computed, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import MyTable from './components/MyTable.vue';
import { useLeadsStore } from '@/stores/leads';

const leadsStore = useLeadsStore();

const fetchLeads = () => {
	leadsStore.fetchLeads();
};

onMounted(() => {
	fetchLeads();
});
</script>

<template>
	<header>
		<div class="wrapper">
			<HelloWorld msg="Тестовое приложение amoCRM" />
		</div>
	</header>
	<main>
		<MyTable
			:leads="leadsStore.leads"
			:loading="leadsStore.loading"
			:error="leadsStore.error"
		/>
	</main>
</template>

<style scoped></style>
