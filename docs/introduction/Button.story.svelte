<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client';

  export const __pageMeta: PageMeta = {
    title: 'Button',
    description: 'My awesome button.',
  };
</script>

<script>
  import Knobs from '../../.vitebook/addons/Knobs.svelte';
  import { Variant } from '@vitebook/client';
  import { EventsAddon, eventCallback } from '@vitebook/client/addons';
  import Button from './Button.svelte';

  let title = 'Click Me';
</script>

<Variant name="Default" description="The default button.">
  <Button on:click={eventCallback}>{title}</Button>
</Variant>

<Variant name="Knobbed" description="Trying knobs">
  <Knobs knobs={{ prop1: false }} let:knobs>
    {JSON.stringify(knobs)}
    <Button on:click={eventCallback}>{title}</Button>
  </Knobs>
</Variant>

<!-- <Variant
  name="Disabled"
  description="The disabled button."
  on:enter={() => {
    disabled = true;
  }}
  on:exit={() => {
    disabled = false;
  }}>
  <Button {disabled}>{title}</Button>
</Variant> -->

<EventsAddon />
