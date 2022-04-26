<script lang="ts">
	import ChevronUpIcon from '$lib/components/icons/chevron_up.svelte';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Transition
	} from '@rgossiaux/svelte-headlessui';

	export let title: string;
	export let url: string;
</script>

<Disclosure as="section" let:open>
	<DisclosureButton
		role="checkbox"
		class={`
                    flex justify-between items-center w-full px-4 py-2 text-md font-medium
                    text-left text-blue-600 bg-blue-100 rounded-lg
                    hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500
                    focus-visible:ring-opacity-75 ${open ? 'rounded-b-none' : ''}
                  `}
	>
		<span>Wanna see how it&apos;s made?</span>
		<ChevronUpIcon
			class={`${!open ? 'rotate-180' : ''} transition-transform text-blue-500
                    `}
		/>
	</DisclosureButton>
	<Transition
		appear
		show={open}
		aria-expanded={open}
		enter="transition-all origin-top duration-700 ease-out"
		enterFrom="scale-y-0 opacity-0"
		enterTo="scale-y-100 opacity-100"
		leave="transition-all origin-top duration-700 ease-out"
		leaveFrom="scale-y-100 opacity-100"
		leaveTo="scale-y-0 opacity-0"
		unmount={false}
	>
		<DisclosurePanel
			static
			aria-hidden={!open}
			as="iframe"
			class="aspect-video w-full"
			{title}
			name="Meal recipe on Youtube"
			src={url.replace('watch?v=', 'embed/')}
		/>
	</Transition>
</Disclosure>
