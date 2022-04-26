<script>
	//App.svelte
	import { QueryClient, QueryClientProvider, QueryCache, Hydrate } from '@sveltestack/svelte-query';
	import NavBar from '$lib/components/appbar/nav.svelte';
	import '../styles/globals.css';

	// Create a client
	const queryClient = new QueryClient({ queryCache: new QueryCache() });
</script>

<QueryClientProvider client={queryClient}>
	<!-- <Hydrate> -->
	<NavBar />

	<slot />
	<!-- </Hydrate> -->
</QueryClientProvider>
