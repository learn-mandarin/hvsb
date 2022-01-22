<script lang="ts">
  export let bookId: string, chapter: string;
  let showChapterSelector = false;
  import { bookName, bookAbbrev } from '$lib/stores';
</script>

<div class="flex items-center">
  {#if !showChapterSelector}
    <a class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2 print:hidden" href="/">
      <i class="fas fa-home fa-fw" />
    </a>
  {:else}
    <button
      on:click={() => (showChapterSelector = false)}
      type="button"
      class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2"
    >
      <i class="fas fa-times fa-fw" />
    </button>
  {/if}

  <button
    on:click={() => (showChapterSelector = !showChapterSelector)}
    type="button"
    class="font-semibold sm:text-xl py-2 px-3 hover:bg-gray-200
    rounded-lg"
  >
    <span class="hidden sm:inline">{bookName(bookId)}</span>
    <span class="sm:hidden">{bookAbbrev(bookId)}</span>
    <span>{chapter}</span>
    <i class="fas {showChapterSelector ? 'fa-caret-up' : 'fa-caret-down'}  fa-sm" />
  </button>
</div>

{#if showChapterSelector}
  {#await import('$lib/components/navigation/ChapterSelector.svelte') then ChapterSelector}
    <ChapterSelector.default
      on:close={() => {
        showChapterSelector = false;
      }}
    />
  {/await}
{/if}
