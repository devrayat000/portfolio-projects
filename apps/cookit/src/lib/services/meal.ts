import type { IMeal } from '$lib/types/meal';
import { mealdb } from '$lib/utils/axios';
import type { QueryFunctionContext } from '@sveltestack/svelte-query';

export function getMealById({ queryKey }: QueryFunctionContext<[string, string]>) {
	return mealdb.get<{ meals: IMeal[] }>('/lookup.php', {
		params: { i: queryKey[1] }
	});
}
