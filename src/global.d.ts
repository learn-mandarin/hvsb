/// <reference types="@sveltejs/kit" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // onlongpress?: (
    //     event: CustomEvent<any> & { target: EventTarget & T }
    // ) => any;
    onclickedOutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
    // onbeforeinstallprompt?: (event: any) => any;
    // If you want to use myCustomAttribute={..} (note: all lowercase)
    // mycustomattribute?: any; // You can replace any with something more specific if you like
  }
}

declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, unknown>;

  // When "Mode.HTML" is requested
  const html: string;
}

interface ImportMetaEnv {
  VITE_bibleApi: string; // prod is added to Vercel env variables
  VITE_stripePublishable: string;
  VITE_vimeoUnauthenticatedAccessToken: string;
  // VITE_vimeoAuthenticatedAccessToken: string; // TODO: add to Vercel env variables after using
  VITE_ProcessImageUrl: string; // added to Vercel env variables
  VITE_FIREBASE_CONFIG: string; // prod is added to Vercel env variables
}
