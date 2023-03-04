import {
  AnyAction,
  configureStore,
  Store,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { listenerMiddleware } from './middleware';

import news from './slices/news';
import user, { initialState } from './slices/user';

const authState = JSON.parse(localStorage.getItem('auth') || 'null');

export const store = configureStore({
  preloadedState: {
    user: authState === null ? initialState : authState,
  },
  reducer: {
    news,
    user,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
