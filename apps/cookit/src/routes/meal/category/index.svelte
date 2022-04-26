<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { mealdb } from '$lib/utils/axios';

	export const prerender = true;

	export const load: Load = async () => {
		const res = await mealdb.get('/categories.php');
		return {
			props: {
				categories: res.data['categories']
			}
		};
	};
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import CategoryCard from '$lib/components/card/category.svelte';
	import type { ICategory } from '$lib/types/category';

	export let categories: ICategory[];
</script>

<main class="flex justify-center">
	<MetaTags
		title="Categories | COOKit"
		description={`${categories.length} different meal categories to choose from!`}
		additionalLinkTags={[{ rel: 'icon', href: '/images/garnish.png' }]}
		openGraph={{
			title: 'Categories | COOKit',
			description: `${categories.length} different meal categories to choose from!`,
			url: 'https://cookingit.netlify.app/category',
			images: [
				{
					url: '/demos/categories.png',
					alt: 'Categories | COOKit'
				}
			]
		}}
	/>
	<section class="container mb-12">
		<h1 class="text-center my-6">Categories</h1>

		<!-- TODO: Write description for category page -->
		<p>{categories.length} different meal categories to choose from!</p>

		<article class="flex justify-center items-stretch flex-wrap gap-3 container">
			{#each categories as category (category.idCategory)}
				<CategoryCard {category} />
			{/each}
		</article>
	</section>
</main>
