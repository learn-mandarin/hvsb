<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="md:px-1 lg:px-3">
  <div class="hidden md:flex justify-between items-center mb-1">
    <a
      class="font-medium px-3 py-2 hover:bg-gray-200 text-gray-700 rounded"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}"
    >
      <i class="fas fa-arrow-left" /> Back to List
    </a>
  </div>
  <div class="flex md:hidden items-center pl-2 pr-1 py-2">
    <h2 class="font-xl font-semibold mr-auto">Verse {$page.params.verse}</h2>
    <a
      class="font-medium px-3 py-2 text-gray-700"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}"
      sveltekit:noscroll
    >
      <i class="fas fa-times" />
    </a>
  </div>
  <slot />
</div>
