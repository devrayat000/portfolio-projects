<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { mealdb } from '$lib/utils/axios';
	import { parseIngredients } from '$lib/utils/parse_ingredients';
	import { extractIdFromSlug, makeSlug } from '$lib/utils/slug';

	export const prerender = true;

	export const load: Load<StaticPath> = async ({ params }) => {
		const slug = params.slug;

		const id = extractIdFromSlug(slug);

		const res = await mealdb.get<{ meals: IMeal[] }>('/lookup.php', {
			params: { i: id }
		});

		if (res.status == 404) {
			return {
				notFound: true
			};
		}

		return {
			props: {
				meal: parseIngredients(res.data.meals[0])
			}
		};
	};

	interface StaticPath extends Record<string, string> {
		slug: string;
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import Youtube from '$lib/components/icons/youtube.svelte';
	import CategoryLink from '$lib/components/link/category.svelte';
	import Breadcrumb from '$lib/components/list/breadcrumb.svelte';
	import Info from '$lib/components/meal/info.svelte';
	import Ingredient from '$lib/components/meal/ingredient.svelte';

	import type { IMeal } from '$lib/types/meal';

	export let meal: IMeal;

	let instructions = meal.strInstructions
		.replace(/\n/g, '<br/>')
		.replace(/(STEP\s\d+)/gi, '<b>$1</b>');
</script>

<main class="m-4">
	<MetaTags
		title={`${meal.strMeal} | COOKit`}
		description={meal.strInstructions}
		additionalLinkTags={[{ rel: 'icon', href: '/images/garnish.png' }]}
		openGraph={{
			title: `${meal.strMeal} | COOKit`,
			description: meal.strInstructions,
			url: `https://cookingit.netlify.app/meal/${makeSlug(meal.strMeal)}_${meal.idMeal}`,
			images: [
				{
					url: meal.strMealThumb ?? '/demos/intro.png',
					alt: `${meal.strMeal} | COOKit`
				}
			]
		}}
	/>
	<section aria-labelledby="meal-name" class="container mx-auto">
		<h1 id="meal-name" class="text-center">
			{meal.strMeal}
		</h1>

		<section class="flex justify-between items-start mb-8">
			<div class="flex-1 lg:flex-2 prose-h3:m-0">
				{#if meal.strCategory}
					<Info title="Category">
						<CategoryLink category={meal.strCategory} class="link link-hover">
							<h3>{meal.strCategory}</h3>
						</CategoryLink>
					</Info>
				{/if}
				{#if meal.strArea}
					<Info title="Area">
						<h3>{meal.strArea}</h3>
					</Info>
				{/if}
				{#if meal.strTags}
					<Breadcrumb tags={meal.strTags.split(',')} />
				{/if}
				{#if meal.strSource}
					<a
						href={meal.strSource}
						target="_blank"
						rel="noreferrer noopener"
						class="btn btn-secondary"
					>
						View Original
					</a>
				{/if}
			</div>
			{#if meal.strMealThumb}
				<div class="relative flex-1 aspect-square min-w-min">
					<img
						src={meal.strMealThumb}
						alt={meal.strMeal}
						object-fit="contain"
						object-position="right top"
						sizes="100vw"
						class="rounded-md"
					/>
				</div>
			{/if}
		</section>

		<article class="">
			{#if meal.strYoutube}
				<Youtube title={meal.strMeal} url={meal.strYoutube} />
			{/if}
			<section class="">
				<h2 class="text-center">Ingredients</h2>
				<ul class="list-none list-inside ing-list grid md:grid-cols-2 lg:grid-cols-3">
					{#each meal.ingredients as ingredient (ingredient.item)}
						<Ingredient {...ingredient} />
					{/each}
				</ul>
			</section>
			<section class="flex-2">
				<h2 class="text-center">Instructions</h2>
				<p contenteditable="true" bind:innerHTML={instructions} />
			</section>
		</article>
	</section>
</main>
