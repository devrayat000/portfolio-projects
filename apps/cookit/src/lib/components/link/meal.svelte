<script lang="ts">
	import { makeSlug } from '$lib/utils/slug';
	import type { IMealBase } from '$lib/types/meal';

	export let meal: IMealBase;
</script>

<a
	href={`/meal/${makeSlug(meal.strMeal)}-${meal.idMeal}`}
	title={meal.strMeal}
	sveltekit:noscroll
	{...$$restProps}
>
	<slot />
</a>
