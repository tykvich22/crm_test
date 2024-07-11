import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface Lead {
	id: number;
	name: string;
	price: number;
	status_id: number;
	responsible_user_id: number;
}

export const useLeadsStore = defineStore('leads', () => {
	const leads = ref<Lead[]>([]);
	const loading = ref<boolean>(false);
	const error = ref<string | null>(null);
	const bearerToken = import.meta.env.VITE_TOKEN;

	const fetchLeads = async () => {
		loading.value = true;
		error.value = null;

		try {
			const response = await fetch('/api/leads', {
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			});

			if (!response.ok) {
				throw new Error('Failet to fetch leads');
			}

			const data = await response.json();
			leads.value = data._embedded.leads.map(
				({ id, name, price, responsible_user_id, status_id }: Lead) => ({
					id,
					name,
					price,
					responsible_user_id,
					status_id,
				})
			);
			console.log(leads.value);
		} catch (error: any) {
			console.log(error);
			error.value = error.message;
		} finally {
			loading.value = false;
		}
	};

	return {
		leads,
		loading,
		error,
		fetchLeads,
	};
});
