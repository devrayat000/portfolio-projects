<script>
	//App.svelte
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import NProgress from 'nprogress';

	import NavBar from '$lib/components/appbar/nav.svelte';
	import createQueryClient from '$lib/utils/query';

	import 'nprogress/nprogress.css';
	import '../styles/globals.css';

	// Create a client
	const queryClient = createQueryClient();

	NProgress.configure({
		template: `
			<div class="bar" role="bar">
				<div class="peg"></div>
			</div>
			<div class="spinner" role="spinner">
					<div class="spinner-icon"></div>
			</div>
			<div class="overlay"></div>`
	});
	beforeNavigate((navigation) => {
		console.log('Navigation started!');
		NProgress.start();
	});

	afterNavigate((navigation) => {
		console.log('Navigation ended!');
		NProgress.done();
	});
</script>

<QueryClientProvider client={queryClient}>
	<!-- <Hydrate> -->
	<NavBar />

	<slot />
	<!-- </Hydrate> -->
</QueryClientProvider>
