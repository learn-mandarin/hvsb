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

<!--
 @component
 Pass knobs properties (boolean, string, number, or range) to the `input` prop access values from `let:output`. Typescript provides autocompletion for the proper properties on the way out. I prefer to use the shortcut notation as documented in the [Svench docs](https://svench-docs.vercel.app/_/Usage/knobs#knobs-passed-as-plain-objects-shortcut-notation) with the type of the knob being inferred from it.

Range knobs can be declared using a default value matching the format ${minValue}${maxValue};${initialValue} (e.g., -10-10;5).

Example usage: `<Knobs input={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }} let:output={{myBool, myNum, myStr, myRange}}>`

TODO: Though full object notation works as seen in the Svench docs, the type interface will be incorrect. If someone has a compelling use case for full object notation, they can help me know how to improve the use of Generics and types through the `knobs.ts` file to achieve such.
-->
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
