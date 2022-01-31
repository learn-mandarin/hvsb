<script lang="ts">
  export let start: string;
  let min: number;
  let max: number;
  let parsedValue: number;

  $: {
    const match = /^(-?[\d.]+)-(-?[\d.]+)(?:;([\d.]+))?$/.exec(start);
    if (match) {
      min = +match[1];
      max = +match[2];
      parsedValue = +match[3];
      // console.log(parsedValue);
      // setTimeout(() => dispatch('update', parsedValue), 1000);
    }
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ update: string }>();
</script>

{#if min}
  <input
    type="range"
    value={parsedValue}
    {min}
    {max}
    on:input={(e) => {
      // @ts-ignore
      dispatch('update', e.target.value);
    }}
  />
{:else}
  <input
    value={start}
    on:input={(e) => {
      // @ts-ignore
      dispatch('update', e.target.value);
    }}
  />
{/if}
