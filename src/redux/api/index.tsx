import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  DEFAULT_PAGINATION_START_FROM,
  DEFAULT_PAGINATION_LIMIT,
} from '../../constants';
import { INewsItem, INewsParams } from '../slices/news/types';

export const fetchNews = createAsyncThunk<INewsItem[], INewsParams>(
  'news/fetchNews',
  async params => {
    const {
      startFrom = DEFAULT_PAGINATION_START_FROM,
      limit = DEFAULT_PAGINATION_LIMIT,
    } = params;

    const { data } = await axios.get<INewsItem[]>(
      `${process.env.REACT_APP_URI_API}?_start=${startFrom}&_limit=${limit}`,
    );
    return data || [];
  },
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URI_API}/${id}`,
      );
      if (response?.status === 200) return id;
    } catch (error) {
      return rejectWithValue(`Can't delete news. Server error: ${error}`);
    }
  },
);
