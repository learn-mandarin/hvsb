<script>
  import { Addon } from '@vitebook/client/addons';
  import KnobsInput from './KnobsInput.svelte';
  export let title = 'Knobs';
  export let icon = undefined;

  let knobInput;
  export { knobInput as knobs };

  import parseKnobs from './knobs';

  $: knobs = parseKnobs(knobInput);
</script>

<slot knobs={$knobs} />

<Addon {title} {icon}>
  Knobs here:

  {#if $knobs}
    {JSON.stringify($knobs)}
    {#each knobs.fields as field (field.name)}
      <KnobsInput {knobs} {field} />
    {/each}
  {/if}
</Addon>
