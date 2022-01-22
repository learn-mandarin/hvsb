<script lang="ts">
  import SupportMessageRow from './_SupportMessageRow.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { Collection } from '$sveltefirets';
  import Filter from './_Filter.svelte';

  import type { ISupportMessage } from '$lib/interfaces';
  let messagesType: ISupportMessage[] = [];
  import ResponsiveTable from '$lib/components/ui/ResponsiveTable.svelte';
</script>

<View padding={true}>
  <Collection path="supportMessages" startWith={messagesType} let:data={messages}>
    <Filter items={messages} let:filteredItems={filteredMessages} placeholder="Search messages">
      <ResponsiveTable class="my-1">
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>URL</th>
          <th>Date</th>
        </thead>
        {#each filteredMessages as message}
          <SupportMessageRow {message} />
        {/each}
      </ResponsiveTable>
    </Filter>
  </Collection>
</View>
