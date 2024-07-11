<template>
	<div>
		<a-spin v-if="loading" size="large" />
		<div v-else>
			<p v-if="data">{{ data }}</p>
			<p v-else>Ошибка запроса</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
const bearerToken = import.meta.env.VITE_TOKEN;

const loading = ref<boolean>(true);
const data = ref<string | null>(null);
const error = ref<string | null>(null);

const props = defineProps<{
	id: number;
	fetchType: string;
}>();

const fetchData = async () => {
	try {
		loading.value = true;
		error.value = null;
		const response = await fetch(`api/users/${props.id}`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failet to fetch data');
		}

		const fetChingdata = await response.json();

		data.value = fetChingdata.name;
	} catch (error: any) {
		console.log(error);
		error.value = error.message;
	} finally {
		loading.value = false;
	}
};

watch(
	() => props.id,
	() => {
		fetchData();
	}
);

onMounted(() => {
	fetchData();
});
</script>
