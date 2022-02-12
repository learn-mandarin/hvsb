<script lang="ts">
  import UserRow from './_UserRow.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { Collection } from '$sveltefirets';
  import Filter from './_Filter.svelte';

  import type { IUser } from '$lib/interfaces';
  let usersType: IUser[] = [];
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { exportUsersAsCSV } from '$lib/helpers/export';
  import ResponsiveTable from '$lib/components/ui/ResponsiveTable.svelte';
  import SortUsers from './_SortUsers.svelte';
</script>

<View padding={true}>
  <Collection path="users" startWith={usersType} let:data={users}>
    <Filter items={users} let:filteredItems={filteredUsers} placeholder="Search names and emails">
      <div slot="right">
        <Button
          form="filled"
          color="black"
          onclick={() => exportUsersAsCSV(filteredUsers, 'hvsb-users')}
        >
          <i class="fas fa-download mr-1" />
          Download {filteredUsers.length} Users as CSV
        </Button>
      </div>

      <ResponsiveTable class="my-1">
        <SortUsers users={filteredUsers} let:sortedUsers>
          {#each sortedUsers as user}
            <UserRow {user} />
          {/each}
        </SortUsers>
      </ResponsiveTable>
    </Filter>
  </Collection>
</View>
