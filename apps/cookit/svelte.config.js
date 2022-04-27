import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import image from 'svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: {
		...image({
			placeholder: 'trace',
			webp: true
		}),
		...preprocess({})
	},

	kit: {
		adapter: adapter(),
	},
};

export default config;
