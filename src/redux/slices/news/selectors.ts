import { RootState } from '../../store';

export const getSlice = (state: RootState) => state.news;

export const getNewsItems = (state: RootState) => getSlice(state).items;

export const getFetchNewsStatus = (state: RootState) =>
  getSlice(state).fetchStatus;

export const getDeleteItemNewsStatus = (state: RootState) =>
  getSlice(state).deleteItemStatus;

export const getDeleteErrorText = (state: RootState) =>
  getSlice(state).errorText;
