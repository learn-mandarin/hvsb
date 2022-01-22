<script lang="ts">
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { html } from './privacy-policy.md';
</script>

<svelte:head>
  <title>Privacy Policy</title>
</svelte:head>

<Header>
  <a class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2 print:hidden" href="/">
    <i class="fas fa-home fa-fw" />
  </a>
  <span class="font-semibold leading-tight sm:text-xl"> Privacy Policy </span>
</Header>

<View padding={true} marginTop={true} maxWidth={true}>
  <div class="prose max-w-none">
    {@html html}
  </div>
</View>
