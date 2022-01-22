<script lang="ts">
  import Dropzone from './_Dropzone.svelte';
  import UploadImage from './_UploadImage.svelte';
  export let verseNumber: number;
  let file: File;

  async function handleImage(files: FileList) {
    const fileToCheck = files.item(0);
    if (fileToCheck.type.split('/')[0] !== 'image') {
      return alert('Unsupported File Type');
    }
    // Must be smaller than 20MB, http://www.unitconversion.org/data-storage/megabytes-to-bytes-conversion.html
    if (fileToCheck.size > 20971520) {
      return alert('Images must be smaller than 20MB');
    }
    file = fileToCheck;
  }
</script>

{#if !file}
  <Dropzone on:addedfile={(event) => handleImage(event.detail)}>
    <div class="text-center">
      <div class="font-semibold mb-2">Add Image</div>
      Drag and drop an image or choose a file...
    </div>
  </Dropzone>
{:else}
  <div class="mb-2" style="height: 200px;">
    <UploadImage {file} {verseNumber} />
  </div>
{/if}
