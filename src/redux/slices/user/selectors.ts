import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { USERNAME_VALIDATION } from '../../../constants';

export const getSlice = (state: RootState) => state.user;

export const getUserName = (state: RootState) => getSlice(state).name;

export const getIsAuthorized = createSelector(
  getUserName,
  username => username === USERNAME_VALIDATION,
);
