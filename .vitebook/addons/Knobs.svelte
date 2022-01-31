<script lang="ts">
  import { Addon } from '@vitebook/client/addons';
  import { writable } from 'svelte/store';
  import KnobStrings from './KnobStrings.svelte';
  export let icon = undefined;

  type T = $$Generic;
  export let input: T;
  $: knobs = writable<Partial<T>>({});
</script>

<slot output={$knobs} />

<Addon title="Knobs" {icon}>
  <pre>{JSON.stringify(input, null, 1)}</pre>
  {#each Object.keys(input) as key (key)}
    {@const type = typeof input[key]}
    <label for="">
      <span>{key}</span>
      {type}
      {#if type === 'string'}
        <KnobStrings
          on:update={(e) => {
            if (parseInt(e.detail)) {
              $knobs[key] = parseInt(e.detail);
            } else {
              $knobs[key] = e.detail;
            }
          }}
          start={input[key]}
        />
      {:else if type === 'number'}
        <input type="number" bind:value={$knobs[key]} />
      {:else if type === 'boolean'}
        <input type="checkbox" bind:checked={$knobs[key]} />
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
