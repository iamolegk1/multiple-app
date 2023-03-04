import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { addUser } from './slices/user';
import { RootState } from './store';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addUser),
  effect: (_, listenerApi) =>
    localStorage.setItem(
      'auth',
      JSON.stringify((listenerApi.getState() as RootState).user),
    ),
});
