<script>
  import { Addon } from '@vitebook/client/addons';
  import KnobsInput from './KnobsInput.svelte';
  import parseKnobs from './knobs';
  export let icon = undefined;

  let knobInput;
  export { knobInput as knobs };

  $: knobs = parseKnobs(knobInput);
</script>

<slot knobs={$knobs} />

<Addon title="Knobs" {icon}>
  <div title={JSON.stringify(knobs, null, 1)}>Knobs</div>
  {JSON.stringify(knobs, null, 1)}
  {#each knobs.fields as field (field.name)}
    <KnobsInput {knobs} {field} />
  {/each}
</Addon>
