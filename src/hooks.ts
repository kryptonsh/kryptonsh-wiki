import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
  const cookies: { [p: string]: string } = cookie.parse(event.request.headers.get('cookie') || '');
  event.locals.userid = cookies.userid || uuid();

  const response: Promise<Response> | Response = await resolve(event);

  if (!cookies.userid) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
        'set-cookie',
        cookie.serialize('userid', event.locals.userid, {
          path: '/',
          httpOnly: true
        })
    );
  }

  return response;
};
