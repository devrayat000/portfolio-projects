<script lang="ts">
	import { Transition } from '@rgossiaux/svelte-headlessui';
	import ClearIcon from './clear_icon.svelte';
	import SearchIcon from './search_icon.svelte';

	let searchInput: string = '';
</script>

<form role="searchbox">
	<div class="form-control">
		<label class="relative">
			<input
				type="search"
				name="search"
				id="search"
				placeholder="eg. Chicken Breast"
				class="input input-bordered w-full px-16 peer ring-primary"
				bind:value={searchInput}
			/>
			<SearchIcon
				class="text-gray-600 peer-focus:text-blue-600 absolute inset-y-0 left-4 my-auto"
			/>
			<Transition
				as="button"
				type="reset"
				show={!!searchInput}
				class="absolute inset-y-0 my-auto right-4 text-gray-600 peer-focus:text-blue-600"
				enter="transition-transform"
				enterFrom="scale-0"
				enterTo="scale-100"
				leave="transition-transform"
				leaveFrom="scale-100"
				leaveTo="scale-0"
			>
				<span on:click={() => (searchInput = '')}>
					<ClearIcon />
				</span>
			</Transition>
		</label>
	</div>
</form>
