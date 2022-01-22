<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import type { IVideo, IVimeoVideo } from '$lib/interfaces';
  export let video: Partial<Hit & IVideo & IVimeoVideo>,
    href: string = undefined;
  import { fetchVideoData } from '$lib/helpers/video';

  import { admin, bookAbbrev } from '$lib/stores';
  import { formatTime } from '$lib/helpers/time';
  import { deleteVideo } from '$lib/helpers/video';
</script>

<a
  href={href ||
    `WEB/${video.chapterIds[0].split('.')[0]}/${video.chapterIds[0].split('.')[1]}/vid/${video.id}`}
  sveltekit:prefetch
  class="{!video.verseIds &&
    'ml-4 sm:ml-6'} hover:bg-gray-200 shadow overflow-hidden rounded-sm mb-2 flex
  items-stretch text-left"
>
  {#if video.uri}
    <div class="media-block bg-gray-500 relative">
      <img
        alt="Play Video"
        style="height: 100%; width: 100%; object-fit: cover;"
        src={video.pictures.sizes[1].link.replace('?r=pad', '')}
      />
      <div
        class="absolute top-0 right-0 bottom-0 left-0 flex items-center
        justify-center"
      >
        <i class="fas fa-play fa-2x text-white" />
      </div>
    </div>

    <div class="p-2 grow flex flex-col justify-between">
      <div class="text-sm font-semibold text-gray-900">
        <slot name="title">
          {video.name}
        </slot>
        <slot name="admin" />
      </div>
      <div class="text-xs">{video.description}</div>
      <div class="flex justify-between items-center">
        <div class="text-xs text-gray-600">
          Video, {formatTime(video.duration)}
        </div>
        {#if $admin && video.verseIds}
          <button
            on:click|preventDefault|once={() => deleteVideo(video.id)}
            class="cursor-pointer rounded leading-tight font-medium text-red-600
            hover:text-red-800 ml-auto px-2 py-1 bg-red-100 mr-2"
          >
            <i class="fas fa-trash" />
            <i class="fas fa-key" />
          </button>
        {/if}
        <slot name="verses" />
      </div>
    </div>
  {:else}
    {#await fetchVideoData(video.id)}
      <div class="media-block bg-gray-500 relative">
        <div style="background: lightgray; width: 75px; height: 75px;" />
        <div
          class="absolute top-0 right-0 bottom-0 left-0 flex items-center
          justify-center"
        >
          <i class="fas fa-play fa-2x text-white" />
        </div>
      </div>
      <div class="p-2 grow flex flex-col justify-between">
        <div class="text-sm font-semibold text-gray-900">
          <slot name="title">...</slot>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-600">Video</div>
          {#if video.currentVerses}
            <span
              class="px-2 py-1 leading-tight bg-gray-200 rounded text-sm
            font-medium"
            >
              {video.currentVerses.length > 1 ? 'vv' : 'v'}
              {#each video.currentVerses as verse, i}
                {#if i === video.currentVerses.length - 1}
                  {verse}
                {:else}{verse},&nbsp;{/if}
              {/each}
            </span>
          {:else}
            {#each video.verseIds as verseId}
              <a
                href={href ||
                  `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/vid/${video.id}`}
                sveltekit:prefetch
                class="ml-1 mt-1 px-2 py-1 leading-tight text-sm font-medium bg-gray-100 hover:bg-white rounded"
              >
                {bookAbbrev(verseId.split('.')[0])}
                {verseId.split('.')[1]}:{verseId.split('.')[2]}
              </a>
            {/each}
          {/if}
        </div>
      </div>
    {:then data}
      <div class="media-block bg-gray-500 relative">
        <img
          alt="Play Video"
          style="height: 100%; width: 100%; object-fit: cover;"
          src={data.pictures.sizes[1].link.replace('?r=pad', '')}
        />
        <div
          class="absolute top-0 right-0 bottom-0 left-0 flex items-center
          justify-center"
        >
          <i class="fas fa-play fa-2x text-white" />
        </div>
      </div>
      <div class="p-2 grow flex flex-col justify-between">
        <div class="text-sm font-semibold text-gray-900">
          <slot name="title">{data.name}</slot>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-600">
            Video, {formatTime(data.duration)}
          </div>
          {#if $admin}
            <button
              on:click|preventDefault|once={() => deleteVideo(video.id)}
              class="cursor-pointer rounded leading-tight font-medium
              text-red-600 hover:text-red-800 ml-auto px-2 py-1 bg-red-100 mr-2"
            >
              <i class="fas fa-trash" />
              <i class="fas fa-key" />
            </button>
          {/if}
          <slot name="verses">
            {#if video.currentVerses}
              <span
                class="px-2 py-1 leading-tight bg-gray-200 rounded text-sm
            font-medium"
              >
                {video.currentVerses.length > 1 ? 'vv' : 'v'}
                {#each video.currentVerses as verse, i}
                  {#if i === video.currentVerses.length - 1}
                    {verse}
                  {:else}{verse},&nbsp;{/if}
                {/each}
              </span>
            {:else}
              {#each video.verseIds as verseId}
                <a
                  href={href ||
                    `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/vid/${video.id}`}
                  sveltekit:prefetch
                  class="ml-1 mt-1 px-2 py-1 leading-tight text-sm font-medium bg-gray-100 hover:bg-white rounded"
                >
                  {bookAbbrev(verseId.split('.')[0])}
                  {verseId.split('.')[1]}:{verseId.split('.')[2]}
                </a>
              {/each}
            {/if}
          </slot>
        </div>
      </div>
    {:catch error}
      {#if $admin}
        Error on video {video.id}: {error}
        <button
          on:click={() => deleteVideo(video.id)}
          class="cursor-pointer font-bold text-red-600 px-2"
        >
          <i class="fas fa-trash" />
          <i class="fas fa-key" />
        </button>
      {/if}
    {/await}
  {/if}
</a>

<style>
  .media-block {
    flex: 0 0 75px;
    width: 75px;
    min-height: 75px;
  }
</style>
