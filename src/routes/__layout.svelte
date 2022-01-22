<script lang="ts">
  import { onMount } from 'svelte';
  import '../global.css';

  onMount(async () => {
    const Sentry = await import('@sentry/browser');
    Sentry.init({
      dsn: 'https://4828396351a943f0acbe567421e6a1d1@o214614.ingest.sentry.io/5384573',
      // https://docs.sentry.io/enriching-error-data/user-feedback
      // beforeSend(event, hint) {
      // 	if (event.exception) {
      // 		Sentry.showReportDialog({ eventId: event.event_id });
      // 	}
      // 	return event;
      // }
    });
  });
</script>

<slot />

{#await import('$lib/components/shell/AuthSubscribeGuard.svelte') then { default: AuthSubscribe }}
  <AuthSubscribe />
{/await}
