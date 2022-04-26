import type { SvelteComponent } from 'svelte';

export interface HeroSectionProps {
	children?: svelte.JSX.Children;
	image: string;
	title: string;
	description: string;
	action?: React.ReactNode;
}

declare class HeroSection extends SvelteComponent<HeroSectionProps> {}

export default HeroSection;
