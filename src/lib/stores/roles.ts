import type { IUser } from '$lib/interfaces';
import { derived } from 'svelte/store';
import { user } from './user';

export const admin = derived(user, ($user: IUser) => {
  if ($user && $user.roles && $user.roles.admin > 0 && !$user.demoted) {
    return $user.roles.admin;
  } else {
    return false;
  }
});

export const contributor = derived(user, ($user: IUser) => {
  if ($user && $user.roles && $user.roles.contributor) {
    return true;
  } else {
    return false;
  }
});

export const translator = derived(user, ($user: IUser) => {
  if ($user && $user.roles && $user.roles.translator) {
    return $user.roles.translator;
  }
});

// On an article, show a "Translate" button if $translator === true, and then show appropriate language to let them translate by checking language value of $translator
