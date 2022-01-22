import { writable } from 'svelte/store';
import type { Unsubscriber } from 'svelte/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';

import { docStore } from './stores';
import type { IBaseUser } from './interfaces';
import { setCookie } from './helpers/cookies';
import { firebaseApp } from './init';

export const authState = writable<User>(null, (set) => {
  if (typeof window !== 'undefined') {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(
      auth,
      (u) => set(u),
      (err) => console.error(err.message)
    );
  }
});

export function createUserStore<T>({ userKey = 'firebase_user', log = false }) {
  const { subscribe, set } = writable<T>(null);
  let unsub: Unsubscriber;

  if (typeof window !== 'undefined') {
    let cached = null;
    cached = JSON.parse(localStorage.getItem(userKey));
    set(cached);

    authState.subscribe((u) => {
      if (u) {
        unsub && unsub();
        const userStore = docStore<T>(`users/${u.uid}`, { log });
        unsub = userStore.subscribe((user) => {
          if (user) {
            set(user);
            cacheUser(user, userKey);
            denoteVisitOnce(user);
          }
        });
      } else {
        set(null);
        removeCachedUser(userKey);
      }
    });
  }

  return { subscribe };
}

export const logOut = async () => {
  const auth = getAuth();
  await signOut(auth);
};

function cacheUser(user: IBaseUser, userKey: string) {
  localStorage.setItem(userKey, JSON.stringify(user));
  const minimalUser: Partial<IBaseUser> = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
  }; // Cookies are limited to 4kb, about 1,000-4000 characters
  setCookie('user', JSON.stringify(minimalUser), { 'max-age': 31536000 });
}

function removeCachedUser(userKey: string) {
  localStorage.removeItem(userKey);
  const yesterday = new Date(new Date());
  yesterday.setDate(yesterday.getDate() - 1);
  setCookie('user', null, { expires: yesterday });
}

const denoteVisitOnce = (() => {
  let denoted = false;
  return async function (user: IBaseUser) {
    if (!denoted) {
      denoted = true;
      try {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', user.uid), { lastVisit: serverTimestamp() });
      } catch (err) {
        console.error(err);
      }
      return true;
    } else {
      return true;
    }
  };
})();
