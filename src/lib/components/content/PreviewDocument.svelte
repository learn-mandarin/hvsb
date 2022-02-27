<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import type { IDocument } from '$lib/interfaces';
  export let href: string = undefined,
    document: Partial<Hit & IDocument>,
    adminPanel = false;
  import { genreBgColor, genreIcon, genreTitle } from '$lib/helpers/genre';
  import { bookAbbrev } from '$lib/stores';
</script>

<a
  href={href ||
    `WEB/${document.chapterIds[0].split('.')[0]}/${document.chapterIds[0].split('.')[1]}/doc/${
      document.id
    }`}
  sveltekit:prefetch
  class="{!document.published &&
    'ml-4 sm:ml-6'} hover:bg-gray-200 shadow overflow-hidden rounded-sm mb-2 flex
  items-stretch text-left">
  <div
    class="media-block {genreBgColor(document.genre)} text-white flex
    items-center justify-center font-bold text-3xl">
    <i class={genreIcon(document.genre)} />
  </div>

  <div class="p-2 grow flex flex-col justify-between">
    <div class="text-sm font-semibold text-gray-900">
      <!-- {#if $$slots.title}
      {/if} -->
      <slot name="title">
        {document.title || document.description || ''}
      </slot>
      <slot name="admin" />
    </div>
    <div class="flex flex-wrap items-center">
      <div class="text-xs text-gray-600 mr-auto">
        {genreTitle(document.genre)}
        {#if !document.published}
          <span
            class="px-2 py-1 leading-tight bg-orange-200 rounded text-orange-600 text-xs font-medium"
            >Unpublished</span>
        {/if}
      </div>
      {#if !adminPanel && document.currentVerses}
        <span class="px-2 py-1 leading-tight text-sm font-medium bg-gray-200 rounded">
          {document.currentVerses.length > 1 ? 'vv' : 'v'}
          {#each document.currentVerses as verse, i}
            {#if i === document.currentVerses.length - 1}
              {verse}
            {:else}{verse},&nbsp;{/if}
          {/each}
        </span>
      {:else}
        {#each document.verseIds as verseId}
          <a
            href={href ||
              `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/doc/${document.id}`}
            sveltekit:prefetch
            class="ml-1 mt-1 px-2 py-1 leading-tight text-sm font-medium bg-gray-100 hover:bg-white rounded">
            {bookAbbrev(verseId.split('.')[0])}
            {verseId.split('.')[1]}:{verseId.split('.')[2]}
          </a>
        {/each}
      {/if}
    </div>
  </div>
</a>

<style>
  .media-block {
    flex: 0 0 75px;
    width: 75px;
    min-height: 75px;
  }
</style>
