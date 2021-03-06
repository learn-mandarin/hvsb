<script context="module" lang="ts">
  let ui: firebaseui.auth.AuthUI;
  declare const firebaseui: typeof import('./firebaseui');
  declare const firebase: typeof import('firebase/compat').default;
</script>

<script lang="ts">
  import type { User } from 'firebase/auth';
  import { onMount, createEventDispatcher } from 'svelte';
  import { getApp } from 'firebase/app';
  // import type { FirebaseOptions } from 'firebase/app';
  import { loadScriptOnce, loadStylesOnce } from '../loader';
  import type { LanguageCodes } from './languageCodes.type';

  // export let firebaseConfig: FirebaseOptions;  // If needing to pass the config into this component manually
  export let languageCode: LanguageCodes = 'en';
  export let tosUrl: firebaseui.auth.Config['tosUrl'] = undefined; // '.../terms' | () => window.location.assign("your-terms-url");
  export let privacyPolicyUrl: firebaseui.auth.Config['privacyPolicyUrl'] = undefined;

  export let signInWith: {
    google?: boolean;
    facebook?: boolean;
    twitter?: boolean;
    github?: boolean;
    emailPassword?: boolean;
    emailPasswordless?: boolean;
    phone?: boolean;
    anonymous?: boolean;
  } = { google: true, emailPasswordless: true };

  const dispatch = createEventDispatcher<{
    close: string | null;
    updateuserdata: { user: User; isNewUser: boolean };
  }>();
  let loading = true;
  let container: HTMLDivElement;

  onMount(async () => {
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js');
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.5.0/firebase-auth-compat.js');
    if (firebase && firebase.apps && firebase.apps.length === 0) {
      const firebaseApp = getApp();
      firebase.initializeApp(firebaseApp.options);
      // firebase.initializeApp(firebaseConfig);
    }
    if (languageCode === 'iw' || languageCode === 'ar') {
      await loadStylesOnce('https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth-rtl.css');
    } else {
      await loadStylesOnce('https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css');
    }
    await loadScriptOnce(
      `https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth__${languageCode}.js`
    );
    initAuthUi();
  });

  function initAuthUi() {
    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          const user = authResult.user as User;
          // var credential = authResult.credential;
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          // const providerId = authResult.additionalUserInfo.providerId; // password or google.com
          // var operationType = authResult.operationType; //signIn
          dispatch('updateuserdata', { user, isNewUser });
          dispatch('close', 'auth success');

          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function (error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          return handleUIError(error);
        },
        uiShown: () => (loading = false),
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disabling for moment if it makes harder with redirect (is ok if works through popup)
      signInFlow: 'popup',
      // signInSuccessUrl: "<url-to-redirect-to-on-success>",
      signInOptions: [
        signInWith.google && firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        signInWith.facebook && firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        signInWith.twitter && firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        signInWith.github && firebase.auth.GithubAuthProvider.PROVIDER_ID,
        signInWith.emailPassword && firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInWith.emailPasswordless && {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          forceSameDevice: false,
        },
        signInWith.phone && firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        signInWith.anonymous && firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
    };

    if (tosUrl) uiConfig.tosUrl = tosUrl;
    if (privacyPolicyUrl) uiConfig.privacyPolicyUrl = privacyPolicyUrl;

    if (ui) {
      ui.reset();
      ui.start(container, uiConfig);
    } else {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(container, uiConfig);
    }
  }

  async function handleUIError(error: firebaseui.auth.AuthUIError): Promise<void> {
    console.error(error);
    window.location.replace('/');
  }
</script>

{#if loading}
  <slot>
    <div>Loading...</div>
  </slot>
{/if}
<div bind:this={container} />
