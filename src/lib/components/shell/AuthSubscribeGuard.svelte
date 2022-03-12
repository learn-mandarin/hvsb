<script lang="ts">
  import NProgress from 'nprogress';
  import './nprogress.css';

  import { onMount } from 'svelte';
  onMount(() => {
    // https://github.com/rstacruz/nprogress#configuration
    NProgress.configure({
      minimum: 0.16,
      showSpinner: false,
    });
  });

  import { navigating, page } from '$app/stores';
  $: if (NProgress) {
    if ($navigating) {
      NProgress.start();
      authSubscribeCheck($navigating.from.pathname);
    }

    if (!$navigating) {
      NProgress.done();
    }
  }

  import { user, admin, isSubscriber } from '$lib/stores';
  let modal: 'auth' | 'subscribe' = null;
  import { goto } from '$app/navigation';
  function authSubscribeCheck(fromPathname: string) {
    if (
      window.location.pathname.includes('img') ||
      window.location.pathname.includes('doc') ||
      window.location.pathname.includes('vid')
    ) {
      if (!$user) {
        goto(fromPathname);
        modal = 'auth';
      } else if (
        !$admin &&
        $page.params.reference &&
        +$page.params.reference > 1 &&
        !isSubscriber($user)
      ) {
        goto(fromPathname);
        modal = 'subscribe';
      }
    }
  }
</script>

{#if modal === 'auth'}
  {#await import('$lib/components/modals/Auth.svelte') then Auth}
    <Auth.default
      context="force"
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}

{#if modal === 'subscribe'}
  {#await import('$lib/components/modals/Subscribe.svelte') then Subscribe}
    <Subscribe.default
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}
