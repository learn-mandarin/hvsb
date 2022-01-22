<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import { FirebaseUiAuth, updateUserData } from '$sveltefirets';
  export let context: 'force' = undefined;
</script>

<Modal on:close>
  <span slot="heading">Sign In</span>
  {#if context === 'force'}
    <h4 class="mb-4">
      You must create a free account to view content beyond the first chapter of each book.
    </h4>
  {/if}
  <FirebaseUiAuth
    signInWith={{ google: true, emailPassword: true }}
    on:close
    on:updateuserdata={(e) => updateUserData(e.detail.user, e.detail.isNewUser)}
  />
</Modal>
