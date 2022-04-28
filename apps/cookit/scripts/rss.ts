import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Feed } from 'feed';

import { makeSlug } from '../src/lib/utils/slug';
import { getAllMeals } from '../src/lib/services/meal';

async function generateRSS() {
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

	const meals = await getAllMeals();

	meals.forEach((meal) => {
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

	const staticDir = resolve('../static/rss.xml');

	await writeFile(staticDir, feed.rss2());
}

generateRSS();
