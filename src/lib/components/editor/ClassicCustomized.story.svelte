<script lang="ts">
  import { Variant } from '@vitebook/client';
  import ClassicCustomized from '$lib/components/editor/ClassicCustomized.svelte';
  let html = '<p>Hello world</p>';
</script>

<div>
  <Variant name="Default" description="Rich Text Editor">
    <!-- {#await import('$lib/components/editor/ClassicCustomized.svelte') then { default: ClassicCustomized }} -->
    <ClassicCustomized bind:html />
    <!-- {/await} -->
    <div style="background: white; padding: 10px; margin: 10px 0;">
      {@html html}
    </div>
    <div style="max-width: 80%;">
      <pre>{html}</pre>
    </div>
  </Variant>
</div>
