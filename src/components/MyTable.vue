<template>
	<div>
		<a-table :columns="columns" :data-source="leads">
			<template #bodyCell="{ column, record }">
				<Suspense>
					<template v-if="column.key === 'name'"">
					<p>{{ record.name  }}</p>
				</template>
				<template v-else-if="column.key === 'price'"">
					<p>{{ record.price  }}</p>
				</template>
				<template v-else-if="column.key === 'status_id'"">
					<p>{{ record.status_id  }}</p>
				</template>
				<template v-else-if="column.key === 'responsible_user_id'"">
					<FetchRecord :id="record.responsible_user_id" :fetchType="column.key" />
				</template>
			</Suspense>
			</template>
		</a-table>
	</div>
</template>

<script setup lang="ts">
import type { Lead } from '@/stores/leads';
import { defineProps } from 'vue';
import FetchRecord from './FetchRecord.vue';

const props = defineProps<{
	leads: Lead[];
	loading: boolean;
	error: string | null;
}>();

const columns = [
	{
		title: '',
		dataIndex: 'button',
		key: 'button',
	},
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Бюджет',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Статус',
		dataIndex: 'status_id',
		key: 'status_id',
	},
	{
		title: 'Ответственный',
		dataIndex: 'responsible_user_id',
		key: 'responsible_user_id',
	},
	
];
</script>

<style scoped>

</style>
