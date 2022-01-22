import { getCookie } from '$lib/helpers/cookies';
import type { Handle, GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
  let user = null;
  try {
    user = JSON.parse(getCookie('user', request.headers.cookie) || null);
  } catch (err) {
    console.log(err);
  }
  request.locals.user = user;

  const response = await resolve(request);
  return response;
};

export const getSession: GetSession = (request) => {
  return {
    user: request.locals.user,
  };
};
