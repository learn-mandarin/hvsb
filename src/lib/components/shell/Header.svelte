<script lang="ts">
  import User from './User.svelte';
  export let home = false;
  let modal: 'contact' | 'auth' = null;
</script>

<header
  class="top-0 z-20 w-full flex items-center p-3 {!home
    ? 'fixed gradient-bg'
    : 'absolute text-white'}">
  <div class="{!home ? 'w-full' : 'container mx-auto'} flex items-center">
    <slot />

    <div class="mr-auto" />

    <a
      href="/search"
      sveltekit:prefetch
      class="{!home ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-200 hover:bg-white '}
      py-2 px-3 rounded hover:text-black border border-transparent print:hidden">
      <i class="fas fa-search" />
      <span class="ml-1 hidden md:inline">Search</span>
    </a>

    <button
      type="button"
      class="{!home ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-200 hover:bg-white '}
      py-2 px-3 rounded hover:text-black border border-transparent print:hidden"
      on:click={() => (modal = 'contact')}>
      <i class="fas fa-question-circle" />
      <span class="ml-1 hidden sm:inline">Contact Us</span>
    </button>
    <User {home} bind:modal />
  </div>
</header>

{#if modal === 'contact'}
  {#await import('$lib/components/modals/Contact.svelte') then { default: Contact }}
    <Contact
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}

{#if modal === 'auth'}
  {#await import('$lib/components/modals/Auth.svelte') then { default: Auth }}
    <Auth
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}

<style>
  .gradient-bg {
    background: linear-gradient(0deg, #f9f9fa00 0%, #f9f9fad9 40%, #f9f9fa 100%);
  }
</style>
