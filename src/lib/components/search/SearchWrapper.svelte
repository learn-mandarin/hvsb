<script lang="ts">
  import instantsearch from 'instantsearch.js';
  import InstantSearch from './InstantSearch.svelte';
  import SearchBox from './widgets/SearchBox.svelte';
  import Hits from './widgets/Hits.svelte';
  import Stats from './widgets/Stats.svelte';
  import RefinementList from './widgets/RefinementList.svelte';
  import RefinementTabs from './widgets/RefinementTabs.svelte';
  import ToggleRefinement from './widgets/ToggleRefinement.svelte';
  import ClearRefinements from './widgets/ClearRefinements.svelte';
  import Pagination from './widgets/Pagination.svelte';
  import PreviewVideo from '$lib/components/content/PreviewVideo.svelte';
  import PreviewImage from '$lib/components/content/PreviewImage.svelte';
  import PreviewDocument from '$lib/components/content/PreviewDocument.svelte';

  import { fade } from 'svelte/transition';
  let showMobileFilters = false;
  import { admin } from '$lib/stores';

  export let previousUrl: string;
</script>

<InstantSearch let:search>
  <div class="sticky top-0 bg-white pb-1 z-10">
    <nav class="flex pt-3 pb-1">
      <RefinementTabs {search} attribute="type" />
      <a
        href={previousUrl || '.'}
        sveltekit:prefetch
        class="px-3 py-2 text-lg text-gray-600 hover:text-gray-900 ml-auto"
        ><i class="fas fa-times" /></a>
    </nav>
    <SearchBox
      placeholder="Search Media"
      {search}
      on:showFilterMenu={() => (showMobileFilters = true)} />
  </div>
  <div class="flex mt-1">
    <div class="w-full">
      <div class="flex justify-between">
        <div class="italic text-xs text-gray-500 mb-1">
          <Stats {search} />
        </div>
      </div>
      <Hits {search} let:hits>
        {#each hits as medium}
          {#if medium.type === 'document'}
            <PreviewDocument document={medium}>
              <span slot="title">
                {@html instantsearch.highlight({
                  attribute: 'title',
                  hit: medium,
                })}</span>
            </PreviewDocument>
          {/if}
          {#if medium.type === 'image'}
            <PreviewImage image={medium}>
              <span slot="title">
                {@html instantsearch.highlight({
                  attribute: 'title',
                  hit: medium,
                })}</span>
            </PreviewImage>
          {/if}
          {#if medium.type === 'video'}
            <PreviewVideo video={medium}>
              <span slot="title">
                {@html instantsearch.highlight({
                  attribute: 'title',
                  hit: medium,
                })}</span
              ></PreviewVideo>
          {/if}
        {:else}No results{/each}
      </Hits>
      <Pagination {search} />
    </div>

    {#if showMobileFilters}
      <div
        transition:fade={{ duration: 300 }}
        class="fixed inset-0 bg-gray-900 bg-opacity-25 z-10"
        on:click={() => (showMobileFilters = false)} />
    {/if}

    <section
      class="{showMobileFilters
        ? 'translate-x-0'
        : 'translate-x-full'} overflow-y-auto w-64 md:w-52 md:ml-3 transition-transform ease-in-out duration-300 fixed md:sticky inset-y-0 right-0 flex p-4 z-20 md:z-auto self-start shrink-0 flex-col md:p-0 bg-white shadow-xl md:shadow-none md:transform-none md-filters-max-height">
      <div class="flex items-center justify-between space-x-3 md:pl-1">
        <h2 class="text-lg leading-7 font-medium text-gray-900">Filters</h2>
        <ClearRefinements {search} />
        <button
          aria-label="Close panel"
          on:click={() => (showMobileFilters = false)}
          class="text-xs py-1 px-2 rounded text-white bg-primary-600
                    md:hidden focus:outline-none focus:border-primary-700
                    focus:ring-primary-500 active:bg-primary-700 transition
                    duration-150 ease-in-out">
          View Results
        </button>
      </div>
      <div class="relative flex-1 overflow-y-auto md:pl-1">
        {#if $admin}
          <h4 class="text-xs font-semibold uppercase text-gray-700">Admin</h4>
          <ToggleRefinement {search} attribute="published" label="Published" />
          <ToggleRefinement {search} attribute="published" on={false} label="Not Published" />
          <div class="mb-4" />
          <hr class="mb-2" />
        {/if}

        <RefinementList {search} attribute="genre" label="Genres" />
        <RefinementList {search} attribute="location" label="Locations" />
        <RefinementList {search} attribute="subject" label="Subjects" />

        {#if $admin}
          <hr class="mb-2" />
          <h4 class="text-xs font-semibold uppercase text-gray-700">Admin</h4>
          <RefinementList {search} attribute="author" label="Authors" />
          <RefinementList {search} attribute="credit" label="Image Credit" />
          <RefinementList {search} attribute="bookIds" label="Books" />
          <RefinementList {search} attribute="chapterIds" label="Chapters" />
          <RefinementList {search} attribute="createdBy" label="Created by" />
        {/if}
      </div>
    </section>
  </div>
</InstantSearch>

<style>
  @media (min-width: 768px) {
    .md-filters-max-height {
      max-height: calc(100vh - 104px);
      top: 104px;
    }
    ::-webkit-scrollbar {
      width: 1rem;
    }

    ::-webkit-scrollbar-track {
      background: 0 0;
    }

    ::-webkit-scrollbar-thumb {
      background: hsl(240, 26%, 91%);
      border-radius: 1rem;
      border: 0.25rem solid #ffffff;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: hsl(240, 9%, 71%);
    }
  }
</style>
