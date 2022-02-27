<script context="module" lang="ts">
  import { prepareChapterMedia } from '$lib/helpers/media';
  import type { IDocument, IImage, IVideo } from '$lib/interfaces';
  import type { IReferenceProps } from './_reference-props.interface';
  import { fetchBibleText, getChapterMedia } from '$lib/helpers/media';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const version: string = params.version;
    const bookId: string = params.bookId;
    const chapter: string = params.reference.match(/[0-9]*/)[0]; // return '12' in a '12.3-13.1' string

    let props: IReferenceProps = {
      version,
      bookId,
      chapter, // verse: page.params.reference[1],
    };

    const mediaPromise = getChapterMedia(bookId, chapter).catch((err) => (props.mediaErr = err));
    const textDataPromise = fetchBibleText(version, bookId, chapter).catch(
      (err) => (props.textErr = err)
    );

    const [media, textData] = await Promise.all([mediaPromise, textDataPromise]);

    if (!props.textErr) {
      if (textData) {
        const { content, next, previous } = textData;
        props.content = content;
        props.previousChapterId = (previous && previous.id) || null;
        props.nextChapterId = (next && next.id) || null;
      } else {
        props.textErr = 'No content for selected version, book, and chapter.';
      }
    }

    if (!props.mediaErr) {
      props.media = prepareChapterMedia(media, bookId, chapter);
    }

    return {
      props,
    };
  };
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import ChapterTitle from '$lib/components/navigation/ChapterTitle.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { chapterMedia } from '$lib/stores';
  import Chapter from '$lib/components/scripture/Chapter.svelte';

  export let version: string,
    bookId: string,
    chapter: string,
    previousChapterId: string,
    nextChapterId: string,
    content,
    media: (IImage | IDocument | IVideo)[],
    textErr,
    mediaErr;

  $: {
    if (browser) {
      localStorage.setItem('currentVersion', version);
      localStorage.setItem('currentBook', bookId);
      localStorage.setItem('currentChapter', chapter);
    }
  }
  $: chapterMedia.set(media);

  let scriptureDiv: HTMLElement;
  $: if (version && bookId && chapter && scriptureDiv) {
    scriptureDiv.scrollTop = 0;
  }
  let mediaDiv: HTMLElement;
  $: if (media && mediaDiv) {
    mediaDiv.scrollTop = 0;
  }

  // TODO: Keep media id in url when navigating chapters with opened media item
  $: previousUrl = (previousChapterId && previousChapterId.replace(/\./g, '/')) || null;
  $: nextUrl = (nextChapterId && nextChapterId.replace(/\./g, '/')) || null;

  let fullWidth = 800;
  import { page } from '$app/stores';
  $: subpageOpen = $page.params && Object.keys($page.params).length > 3;
</script>

<Header>
  <ChapterTitle {bookId} {chapter} />
</Header>

<View>
  <div class="flex md:h-screen" bind:clientWidth={fullWidth}>
    <div
      bind:this={scriptureDiv}
      class="{subpageOpen
        ? 'pb-96'
        : 'pb-32'} px-5 lg:px-20 pt-16 w-full md:w-1/2 md:overflow-y-auto
        md:h-full md:pb-16">
      <div class="scripture">
        {#if textErr}
          <p class="mb-3">
            <i>{textErr}</i>
          </p>
          <p class="text-sm">
            We're having trouble getting the chapter text at the moment. Please reload and use the
            "Contact Us" button in the upper right if the problem persists.
          </p>
        {:else}
          <Chapter {content} {media} {version} {bookId} {chapter} />
        {/if}
      </div>

      {#await import('$lib/components/navigation/VersionSelector.svelte') then { default: VersionSelector }}
        <VersionSelector {version} {bookId} {chapter} />
      {/await}

      {#if previousUrl}
        <a
          class="prev-ch-btn p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed print:hidden"
          style="left: 12px;"
          sveltekit:prefetch
          href="/{version}/{previousUrl}">
          <i class="fas fa-chevron-left text-center" style="width: 1rem;" />
        </a>
      {/if}

      {#if nextUrl}
        <a
          class="next-ch-btn p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed print:hidden"
          style="right: 12px;"
          sveltekit:prefetch
          href="/{version}/{nextUrl}">
          <i class="fas fa-chevron-right text-center" style="width: 1rem;" />
        </a>
      {/if}
    </div>

    <div
      bind:this={mediaDiv}
      class="md:px-1 lg:px-3 md:pt-16 md:pb-16 w-full md:w-1/2 overflow-y-auto
        md:h-full fixed md:relative md:z-auto z-30 bottom-0 md:bottom-auto
        max-h-full no-desktop-shadow bg-white"
      style="box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.35);">
      <div class="hidden md:block mt-1" />
      {#if mediaErr}
        {mediaErr}
      {:else if subpageOpen || fullWidth > 767}
        <slot />
      {/if}
    </div>
  </div>
</View>

<!-- Use in future to redirect chapter text without closing media
element.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = element.href + '/id';
}, false); -->
<style>
  .next-ch-btn,
  .prev-ch-btn {
    bottom: 0.75rem;
    line-height: 1;
  }

  @media only screen and (min-width: 1024px) {
    .next-ch-btn,
    .prev-ch-btn {
      bottom: 51%;
    }
  }

  @media only screen and (min-width: 768px) {
    .no-desktop-shadow {
      box-shadow: none !important;
    }
    .next-ch-btn {
      right: calc(50% + 1.75rem) !important;
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
