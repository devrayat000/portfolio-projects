<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	// import {} from '@sveltestack/svelte-query'
	import { getRandomMeals } from '$lib/utils/random_meals';
	import createQueryClient from '$lib/utils/query';

	export const prerender = true;

	export const load: Load = async ({}) => {
		const queryClient = createQueryClient();
		const { meals } = await getRandomMeals();
		// const { meals } = await queryClient.fetchQuery('random', getRandomMeals);

		return {
			props: {
				meals
			}
		};
	};
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import PrimaryAction from '$lib/components/button/primary_action.svelte';
	import Footer from '$lib/components/card/footer.svelte';
	import HeroSection from '$lib/components/card/hero.svelte';
	import Meals from '$lib/components/list/meals.svelte';
	import SearchIcon from '$lib/components/search/search_icon.svelte';
	import type { IMeal } from '$lib/types/meal';

	export let meals: IMeal[];
</script>

<main>
	<MetaTags
		title="COOKit | MealDB"
		description="A simple web app for food recipies"
		additionalLinkTags={[{ rel: 'icon', href: '/images/garnish.png' }]}
		openGraph={{
			title: 'COOKit | MealDB',
			description: 'A simple web app for food recipies',
			url: 'https://cookingit.netlify.app',
			images: [
				{
					url: '/demos/intro.png',
					alt: 'Intro | COOKit'
				}
			]
		}}
	/>

	<section class="flex justify-between flex-col items-center">
		<HeroSection
			title="Hello there"
			description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
        a id nisi."
			image="https://www.themealdb.com/images/icons/favicon/apple-touch-icon.png"
		>
			<PrimaryAction slot="action" />
		</HeroSection>

		<section class="container mx-auto my-4 p-4 flex justify-center flex-col items-stretch">
			<section class="flex flex-col items-stretch my-8">
				<div role="heading" id="random_meals" aria-level={2} class="m-4">
					<h1 class="text-center">
						Search for <span class="text-fuchsia-600">Delicious</span>{' '}
						Meals
					</h1>
				</div>
				<SearchIcon />
			</section>

			<div role="heading" aria-level={3} class="flex justify-center m-4">
				<h1>
					Random <span class="text-blue-600">Meals</span>
				</h1>
			</div>

			<Meals {meals} />
		</section>
	</section>

	<Footer />
</main>
