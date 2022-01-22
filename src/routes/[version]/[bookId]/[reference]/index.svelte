<script lang="ts">
  import PreviewVideo from '$lib/components/content/PreviewVideo.svelte';
  import PreviewImage from '$lib/components/content/PreviewImage.svelte';
  import PreviewDocument from '$lib/components/content/PreviewDocument.svelte';
  import { chapterMedia } from '$lib/stores';

  import { page } from '$app/stores';
</script>

<div class="hidden md:block">
  {#if $chapterMedia}
    {#each $chapterMedia as medium}
      {#if medium.type === 'document'}
        <PreviewDocument
          document={medium}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${medium.id}`}
        />
      {/if}
      {#if medium.type === 'image'}
        <PreviewImage
          image={medium}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/img/${medium.id}`}
        />
      {/if}
      {#if medium.type === 'video'}
        <PreviewVideo
          video={medium}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/vid/${medium.id}`}
        />
      {/if}
    {/each}
  {/if}
</div>
