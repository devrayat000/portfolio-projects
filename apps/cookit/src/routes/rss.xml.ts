import type { RequestHandler } from '@sveltejs/kit';
import { Feed } from 'feed';

import { makeSlug } from '$lib/utils/slug';
import { mealPromise } from '$lib/services/meal';

export const get: RequestHandler = async () => {
	const baseUrl = 'https://cookingit.netlify.app';

	const feed = new Feed({
		title: 'COOKit | MealDB',
		description: 'A simple web app for food recipies',
		author: {
			name: 'Zul Ikram Musaddik Rayat',
			email: 'dev.rayat000@gmail.com',
			link: 'https://devrayat.me'
		},
		id: baseUrl,
		link: baseUrl,
		feedLinks: {
			rss2: `${baseUrl}/rss.xml`
		},
		copyright: 'All right reserved 2022, Zul Ikram Musaddik Rayat'
	});

	const { allMeals } = await mealPromise;

	allMeals.forEach((meal) => {
		feed.addItem({
			id: meal.idMeal,
			title: meal.strMeal,
			category: meal.strCategory,
			content: meal.strInstructions,
			image: meal.strMealThumb,
			video: meal.strYoutube,
			link: `${baseUrl}/meal/${makeSlug(meal.strMeal)}-${meal.idMeal}`,
			date: new Date(meal.dateModified)
		});
	});

	return {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': `max-age=0, s-maxage=${60 * 60}`
		},
		body: feed.rss2()
	};
};
