<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { categoryBySlug } from '$lib/utils/category_by_slug';

	export const load: Load<StaticPath> = async ({ params }) => {
		const categorySlug = params.slug;
		console.log('category:', categorySlug);

		const res = await mealdb.get<{ meals: IMealBase[] }>('/filter.php', {
			params: { c: categorySlug }
		});
		const category = await categoryBySlug(categorySlug);

		return {
			props: {
				category: category,
				meals: res.data.meals
			}
		};
	};

	interface StaticPath extends Record<string, string> {
		slug: string;
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import Meals from '$lib/components/list/meals.svelte';
	import HeroSection from '$lib/components/card/hero.svelte';
	import { capitalize } from '$lib/utils/capitalize';
	import type { ICategory } from '$lib/types/category';
	import type { IMeal, IMealBase } from '$lib/types/meal';
	import { mealdb } from '$lib/utils/axios';

	export let category: ICategory;
	export let meals: IMeal[];
</script>

<main class="flex flex-col justify-between items-center">
	<MetaTags
		title={`Category - ${capitalize(category.strCategory)} | COOKit`}
		description={category.strCategoryDescription}
		additionalLinkTags={[{ rel: 'icon', href: '/images/garnish.png' }]}
		openGraph={{
			title: `Category - ${capitalize(category.strCategory)} | COOKit`,
			description: category.strCategoryDescription,
			url: `https://cookingit.netlify.app/category/${category.strCategory}`,
			images: [
				{
					url: category.strCategoryThumb ?? '/demos/categories.png',
					alt: `Category - ${capitalize(category.strCategory)} | COOKit`
				}
			]
		}}
	/>
	<section class="container">
		<HeroSection
			title={capitalize(category.strCategory)}
			description={category.strCategoryDescription.replace(/(\[\d+\])/g, '<sup>$1</sup>')}
			image={category.strCategoryThumb}
		/>
		<Meals {meals} />
	</section>
</main>
