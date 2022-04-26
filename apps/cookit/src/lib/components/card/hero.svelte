<script lang="ts">
	export let image: string, title: string, description: string;
</script>

<div class="hero bg-base-200 container mx-auto my-8">
	<div class="hero-content flex-col-reverse md:block w-full">
		<div class="relative aspect-[8/5] w-full md:w-1/3 md:float-right">
			<img src={image} alt="Demo" class="drop-shadow-md" object-position="right center" />
		</div>

		<div class="relative flex-2 md:float-none">
			<h1 class="mb-5 text-5xl font-bold">{title}</h1>
			<p class="mb-5 static" contenteditable="true" bind:innerHTML={description} />
			<slot name="action" />
		</div>
	</div>
</div>
