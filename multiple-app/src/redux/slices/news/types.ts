import { URL_PAGINATION_PARAMS } from '../../../constants';

export interface INewsItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export enum FETCH_ITEMS_STATUS {
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  ERROR = 'error',
}

export enum DELETE_ITEM_STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface INewsSlice {
  items: INewsItem[];
  fetchStatus: FETCH_ITEMS_STATUS;
  deleteItemStatus: DELETE_ITEM_STATUS;
  errorText: string | null;
}

export interface INewsParams {
  startFrom?: string | null;
  limit?: string | null;
  id?: string;
}

export type TURLParamKey = keyof typeof URL_PAGINATION_PARAMS;
export type TURLParams = Partial<Record<TURLParamKey, string>>;
