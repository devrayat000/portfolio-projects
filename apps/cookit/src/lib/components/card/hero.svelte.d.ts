import type { SvelteComponent } from 'svelte';

export interface HeroSectionProps {
	image: string;
	title: string;
	description: string;
}

declare class HeroSection extends SvelteComponent<HeroSectionProps> {}

export default HeroSection;
