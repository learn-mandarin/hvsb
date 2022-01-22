<script lang="ts">
  import Verse from '$lib/components/scripture/Verse.svelte';
  import type { IImage, IDocument, IVideo } from '$lib/interfaces';
  import { parseVerses } from '$lib/helpers/parseVerses';

  export let content: any,
    media: (IImage | IDocument | IVideo)[] = [],
    version = 'WEB',
    bookId = 'MAT',
    chapter = '1';

  $: verses = parseVerses(content);

  $: if (verses && media) {
    verses.forEach((v) => {
      v.media = [];
    });
    media.forEach((m) => {
      m.currentVerses.forEach((v) => {
        if (verses[v - 1]) {
          verses[v - 1].media.push(m);
        }
      });
    });
    verses = verses;
  }
</script>

<svelte:head>
  <link type="text/css" rel="stylesheet" href="/scripture3.css" />
</svelte:head>

{#key version + bookId + chapter}
  {#each verses as verse}
    <!-- Old key (version + bookId + chapter + verse.verseNumber) -->
    <Verse {verse} {version} {bookId} {chapter} />
  {/each}
{/key}
