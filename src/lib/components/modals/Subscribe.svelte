<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { user, isSubscriber, subscriptionStatus, createBillingPortalSession } from '$lib/stores';
  let modal: 'contact' = null;

  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function close() {
    dispatch('close', {
      text: 'subscribe form closed',
    });
  }

  import { loadStripe } from '@stripe/stripe-js/pure.js';
  import type { Stripe } from '@stripe/stripe-js';

  let stripe: Stripe;

  let period: 'monthly' | 'yearly' = 'yearly';
  let endTrialDate: string;
  let submitError;

  onMount(async () => {
    const fourteenDays = 1000 * 60 * 60 * 24 * 14;
    endTrialDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(Date.now() + fourteenDays);
    stripe = await loadStripe(import.meta.env.VITE_stripePublishable);
  });

  import { firebaseApp } from '$sveltefirets';
  import { getFunctions, httpsCallable } from 'firebase/functions';
  async function startCheckout() {
    try {
      const functions = getFunctions(firebaseApp);
      const checkoutFunction = httpsCallable<Record<string, unknown>, string>(
        functions,
        'stripeCreateCheckoutSession'
      );

      const response = await checkoutFunction({
        plan: `basic-${period}`,
        success_url: document.location.href,
        cancel_url: document.location.href,
      });
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data,
      });
      if (error) {
        submitError = error;
      }
      return true;
    } catch (err) {
      submitError = err;
      return false;
    }
  }
</script>

<Modal on:close>
  <span slot="heading">Subscribe to HVSB Basic</span>

  {#if isSubscriber($user)}
    <p>Great! You have a subscription. You may access all study content.</p>
  {:else}
    {#if subscriptionStatus($user) !== 'canceled'}
      <p class="mb-3">
        You must subscribe in order to access study content beyond every first chapter, but we'll
        start you off with a
        <b>free 2 week trial.</b>
        You may cancel your subscription before
        {endTrialDate}
        to avoid being charged.
      </p>
      <div class="my-2">
        <label class="inline-flex items-center mr-6">
          <input
            type="radio"
            class="focus:ring-primary-500 text-primary-700"
            bind:group={period}
            value="yearly"
          />
          <span class="ml-2"> $50/year <small>(2 mo. free)</small> </span>
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            class="focus:ring-primary-500 text-primary-700"
            bind:group={period}
            value="monthly"
          />
          <span class="ml-2">$5/month</span>
        </label>
      </div>
    {:else}
      <p>
        You canceled your subscription and must resubscribe in order to access study content beyond
        every first chapter.
      </p>
    {/if}

    {#if submitError}
      <div class="mb-3 text-red-700">{submitError}</div>
    {/if}

    <div class="mt-5">
      {#if subscriptionStatus($user) !== 'canceled'}
        <Button form="primary" onclick={startCheckout}>Checkout Using Stripe</Button>
      {:else}
        <Button onclick={() => createBillingPortalSession(document.location.href)} form="primary">
          Resubscribe in Billing Portal
          <i class="fas fa-chevron-right" />
        </Button>
      {/if}

      {#if submitError}
        <Button onclick={() => (modal = 'contact')}>Contact Us</Button>
      {/if}

      <Button form="simple" onclick={close}>Cancel</Button>
    </div>
  {/if}
</Modal>

{#if modal === 'contact'}
  {#await import('$lib/components/modals/Contact.svelte') then Contact}
    <Contact.default
      on:close={() => {
        modal = null;
      }}
    />
  {/await}
{/if}
