<script lang="ts">
  import type { IVerse } from '$lib/interfaces';
  import { fetchVideoData } from '$lib/helpers/video';
  import { admin, contributor } from '$lib/stores';
  import { genreColor, genreIcon, genreTitle } from '$lib/helpers/genre';
  export let verse: IVerse, version: string, bookId: string, chapter: string;
  const endingPTag = /<\/p>?$/; // checking for and adding after media to be proper but Chrome will still add the paragraph closing tag back in if we don't (should check other browsers if we remove this)

  let mediaString = '';
  let combinedHTML = '';

  if (verse.media && verse.media.length) {
    for (const medium of verse.media) {
      if (medium.type === 'image') {
        mediaString += `<a sveltekit:prefetch href="/${version}/${bookId}/${chapter}/img/${
          medium.id
        }" sveltekit:noscroll class="inline-flex justify-center items-center" style="vertical-align: text-bottom;">
          <img
            title="${
              medium.title ||
              (medium.description && medium.description.replace(/<[^>]*>/g, '')) ||
              ''
            }"
            alt=""
            class="cursor-pointer bg-gray-400 rounded mr-1 align-baseline
            md:opacity-50 transition-opacity duration-200 hover:opacity-100 h-5 w-5"
            src="https://lh3.googleusercontent.com/${medium.gcs}=s40-p" />
            </a>`;
      }

      if (medium.type === 'document') {
        mediaString += `<a
            sveltekit:prefetch 
            href="/${version}/${bookId}/${chapter}/doc/${medium.id}" 
            sveltekit:noscroll
            class="${genreColor(
              medium.genre
            )} inline-block mr-1 opacity-50 transition-opacity duration-200 hover:opacity-100"
            title="${genreTitle(medium.genre)}: ${medium.title}">
              <i class="${genreIcon(medium.genre)}"></i>
          </a>`;
      }
    }

    combinedHTML =
      verse.content.replace(/(<\/p>)?$/, '') +
      ' ' +
      `<span class="mr-1" style="text-indent: 0;">` +
      mediaString +
      `</span>` +
      (endingPTag.test(verse.content) ? '</p>' : '');
  } else {
    combinedHTML = verse.content;
  }
</script>

{#each verse.media as medium}
  {#if medium.type === 'video'}
    <a sveltekit:prefetch href="/{version}/{bookId}/{chapter}/vid/{medium.id}" sveltekit:noscroll>
      <div
        class="h-20 relative overflow-hidden md:opacity-75 transition-opacity
        duration-200 hover:opacity-100 rounded my-2 bg-black"
        title="Video">
        {#await fetchVideoData(medium.id)}
          <i class="fas fa-play text-white absolute left-2 top-3" />
        {:then data}
          <img
            alt=""
            class="h-full w-full object-cover"
            style="object-position: 0 33%;"
            src={data.pictures.sizes[3].link.replace('?r=pad', '')} />
          <div class="absolute left-2 top-2 text-white text-shadow">
            <i class="fas fa-play mr-1" />
            {data.name.replace(/\([^()]*\)$/, '')}
            <!-- pull out title final verse references found in parenthesis -->
          </div>
        {/await}
      </div>
    </a>
  {/if}
{/each}

{#if $admin || $contributor}
  <a sveltekit:prefetch href="/{version}/{bookId}/{chapter}/{verse.verseNumber}" sveltekit:noscroll>
    {@html combinedHTML}
  </a>
{:else}
  {@html combinedHTML}
{/if}

{#if verse.endParagraph}
  <p class="p" />
{/if}

<style>
  .text-shadow {
    text-shadow: -1px -1px 0 hsl(0, 0%, 33%), 1px -1px 0 hsl(0, 0%, 33%), -1px 1px 0 hsl(0, 0%, 33%),
      1px 1px 0 hsl(0, 0%, 33%);
  }
</style>
