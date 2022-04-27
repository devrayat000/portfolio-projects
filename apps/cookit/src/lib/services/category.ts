import { mealdb } from '$lib/utils/axios';
import type { ICategory } from '$lib/types/category';
import type { QueryFunctionContext } from '@sveltestack/svelte-query';
import type { IMealBase } from '$lib/types/meal';

export function getCategories() {
	return mealdb.get<{ categories: ICategory[] }>('/categories.php');
}

export function getMealsByCategory({ queryKey }: QueryFunctionContext<[string, string]>) {
	return mealdb.get<{ meals: IMealBase[] }>('/filter.php', {
		params: { c: queryKey[1] }
	});
}
