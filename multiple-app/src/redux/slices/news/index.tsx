import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { deleteNews, fetchNews } from '../../api';
import {
  INewsItem,
  INewsSlice,
  FETCH_ITEMS_STATUS,
  DELETE_ITEM_STATUS,
} from './types';

const initialState: INewsSlice = {
  items: [],
  fetchStatus: FETCH_ITEMS_STATUS.LOADING,
  deleteItemStatus: DELETE_ITEM_STATUS.IDLE,
  errorText: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearItemDeleteStatus(state) {
      state.deleteItemStatus = DELETE_ITEM_STATUS.IDLE;
    },
    clearItemList(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.fetchStatus = FETCH_ITEMS_STATUS.LOADING;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<INewsItem[]>) => {
          state.items = [...state.items, ...action.payload];
          state.fetchStatus = FETCH_ITEMS_STATUS.SUCCEEDED;
        },
      )
      .addCase(fetchNews.rejected, state => {
        state.fetchStatus = FETCH_ITEMS_STATUS.ERROR;
      })
      .addCase(deleteNews.pending, state => {
        state.errorText = null;
        state.deleteItemStatus = DELETE_ITEM_STATUS.PENDING;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.items = state.items.filter(news => news.id !== action.payload);
        state.deleteItemStatus = DELETE_ITEM_STATUS.SUCCEEDED;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.deleteItemStatus = DELETE_ITEM_STATUS.FAILED;
        state.errorText = action.payload as string;
      });
  },
});

export default newsSlice.reducer;

export const { clearItemDeleteStatus, clearItemList } = newsSlice.actions;
