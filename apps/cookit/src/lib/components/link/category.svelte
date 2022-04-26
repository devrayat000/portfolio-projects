<script lang="ts">
	import { makeSlug } from '$lib/utils/slug';

	export let category: string;
</script>

<a href={`/meal/category/${makeSlug(category)}`} title={`Category - ${category}`} {...$$restProps}>
	<slot />
</a>
