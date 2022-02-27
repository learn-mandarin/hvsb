<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import type { IImage, IImageParent, IDocumentSection } from '$lib/interfaces';
  export let image: Partial<Hit & IImage>;
  import Modal from '$lib/components/ui/Modal.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { chapterMedia } from '$lib/stores';
  import { page } from '$app/stores';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  let documentId: string;

  import { updateOnline } from '$sveltefirets';
  import { arrayUnion } from 'firebase/firestore/lite';
  async function assignParent() {
    try {
      const newParent: IImageParent = {
        parentId: documentId,
        chapterId: `${$page.params.bookId}.${$page.params.reference}`,
      };
      const { id: imageId } = image;

      const updateImage = updateOnline(`media/${imageId}`, {
        parents: arrayUnion(newParent),
      });

      const newSection: IDocumentSection = {
        contentType: 'image',
        imageId,
      };
      const updateDocument = updateOnline(`media/${documentId}`, {
        sections: arrayUnion(newSection),
      });

      await Promise.all([updateImage, updateDocument]);
      window.location.replace(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${documentId}`
      );
    } catch (err) {
      throw new Error(`Error updating image: ${err}.`);
    }
    close();
  }
</script>

<Modal on:close class="bg-gray-100">
  <span slot="heading">Place Image Into</span>

  <select
    bind:value={documentId}
    class="my-2 rounded-md block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-300 focus:border-primary-300 sm:text-sm sm:leading-5 mr-1">
    {#each $chapterMedia as medium}
      {#if medium.type === 'document'}
        <option value={medium.id}>{medium.title}</option>
      {/if}
    {/each}
  </select>

  <Button form="filled" onclick={assignParent}>Place</Button>
  <Button form="simple" onclick={close}>Cancel</Button>
</Modal>
