<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    return { props: { verse: params.verse } };
  };
</script>

<script lang="ts">
  export let verse: string;
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { admin } from '$lib/stores';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import type { IDocument } from '$lib/interfaces';
  import { addOnline } from '$sveltefirets';
  async function createDocument() {
    try {
      const document: IDocument = {
        bookIds: [$page.params.bookId],
        chapterIds: [`${$page.params.bookId}.${$page.params.reference}`],
        verseIds: [`${$page.params.bookId}.${$page.params.reference}.${$page.params.verse}`],
        title: '',
        authors: ['Hershel Wayne House'],
        genre: 'topical',
        type: 'document',
        sections: [
          {
            contentType: 'text',
            text: '',
          },
        ],
      };
      const { id } = await addOnline<IDocument>('media', document);
      goto(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${id}/edit`
      );
    } catch (err) {
      alert(`Error creating document: ${err}`);
    }
  }
</script>

<div class="p-2">
  <h4 class="font-semibold text-xl mb-3">Verse {verse}</h4>
  <Button class="mb-2" onclick={createDocument}>Add Document</Button>
  {#if $admin}
    <Button
      class="mb-2"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/{$page.params
        .verse}/add-video">
      Add Video ID
    </Button>
    {#await import('./_ReceiveImage.svelte') then { default: ReceiveImage }}
      <ReceiveImage verseNumber={+verse} />
    {/await}
  {/if}
  {#if $admin > 1}
    <Button
      class="mb-2"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/{$page.params
        .verse}/study">
      Study
    </Button>
  {/if}
</div>
