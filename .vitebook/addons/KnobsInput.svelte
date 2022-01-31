<script lang="ts">
  import type { Writable } from 'svelte/store';
  export let knobs: Writable<{
    [k: string]: any;
  }>;
  export let field;
  $: ({ type, name, label, ...props } = field);
</script>

<label for={null}>
  <span>{label || name}</span>
  {#if type === 'number'}
    <input type="number" bind:value={$knobs[name]} {...props} />
  {:else if type === 'range'}
    <input type="range" bind:value={$knobs[name]} {...props} />
  {:else if type === 'bool' || type === 'boolean' || type === 'checkbox'}
    <input type="checkbox" bind:checked={$knobs[name]} {...props} />
  {:else}
    <input bind:value={$knobs[name]} {...props} />
  {/if}
</label>

<style>
  label {
    display: block;
    margin: 0.25em 0.5em;
  }
  label span {
    display: inline-block;
    width: 6.66em;
  }
</style>
