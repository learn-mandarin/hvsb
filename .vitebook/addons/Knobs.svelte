<script lang="ts">
  import { Addon } from '@vitebook/client/addons';
  import parseInput from './knobs';
  export let icon = undefined;

  type T = $$Generic;
  export let input: T;
  $: knobs = parseInput<T>(input);
</script>

<slot output={$knobs} />

<Addon title="Knobs" {icon}>
  {#each knobs.fields as { type, name, label, ...props } (name)}
    <label for="">
      <span>{label || name}</span>
      {#if type === 'text' || type === 'string'}
        <input bind:value={$knobs[name]} {...props} />
      {:else if type === 'range'}
        <input type="range" bind:value={$knobs[name]} {...props} />
      {:else if type === 'number'}
        <input type="number" bind:value={$knobs[name]} {...props} />
      {:else if type === 'boolean'}
        <input type="checkbox" bind:checked={$knobs[name]} {...props} />
      {/if}
    </label>
  {/each}
</Addon>

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
