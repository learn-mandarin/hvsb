<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import type { IImage } from '$lib/interfaces';
  export let href: string = undefined,
    image: Partial<Hit & IImage>,
    adminPanel = false;
  //   import { genreTitle } from "$lib/helpers/genre";
  import { admin, bookAbbrev } from '$lib/stores';
  let showPlaceIntoDocumentModal = false;
</script>

<a
  href={href ||
    `WEB/${image.chapterIds[0].split('.')[0]}/${image.chapterIds[0].split('.')[1]}/img/${image.id}`}
  sveltekit:prefetch
  class="{!image.published &&
    'ml-4 sm:ml-6'} hover:bg-gray-200 shadow overflow-hidden rounded-sm mb-2 flex
  items-stretch text-left">
  <div class="media-block bg-gray-500">
    <img
      alt=""
      style="height: 100%; width: 100%; object-fit: cover;"
      src="https://lh3.googleusercontent.com/{image.gcs}=s150-p" />
  </div>

  <div class="p-2 grow flex flex-col justify-between">
    <div class="text-sm font-semibold text-gray-900">
      <slot name="title">
        {image.title || (image.description && image.description.replace(/<[^>]*>/g, '')) || ''}
      </slot>
      <slot name="admin" />
    </div>
    <div class="flex items-center">
      <div class="text-xs text-gray-600">
        <!-- {genreTitle(image.genre)} -->
        {#if !image.published}
          <span
            class="px-2 py-1 leading-tight bg-orange-200 rounded text-orange-600 text-xs font-medium"
            >Unpublished</span>
        {/if}
      </div>
      <div class="mr-auto" />
      {#if $admin && !image.objectID}
        <button
          type="button"
          on:click|preventDefault={() => (showPlaceIntoDocumentModal = true)}
          class="px-2 py-1 mr-1 rounded hover:bg-white text-gray-700 hover:text-gray-900">
          <i class="fas fa-sitemap" />
        </button>
      {/if}
      {#if !adminPanel && image.currentVerses}
        <span class="px-2 py-1 leading-tight text-sm font-medium bg-gray-200 rounded">
          {image.currentVerses.length > 1 ? 'vv' : 'v'}
          {#each image.currentVerses as verse, i}
            {#if i === image.currentVerses.length - 1}
              {verse}
            {:else}{verse},&nbsp;{/if}
          {/each}
        </span>
      {:else}
        {#each image.verseIds as verseId}
          <a
            href={href || `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/img/${image.id}`}
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

{#if showPlaceIntoDocumentModal}
  {#await import('$lib/components/modals/PlaceIntoDocument.svelte') then PlaceIntoDocument}
    <PlaceIntoDocument.default
      {image}
      on:close={() => {
        showPlaceIntoDocumentModal = false;
      }} />
  {/await}
{/if}

<style>
  .media-block {
    flex: 0 0 75px;
    width: 75px;
    min-height: 75px;
  }
</style>
