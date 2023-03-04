import { FC, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getFetchNewsStatus } from '../redux/slices/news/selectors';
import { clearItemList } from '../redux/slices/news';
import { fetchNews } from '../redux/api';
import { useUrlParams } from '../hooks/useUrlParams';
import {
  DEFAULT_PAGINATION_START_FROM,
  DEFAULT_PAGINATION_LIMIT,
  URL_PAGINATION_PARAMS,
} from '../constants';
import NewsList from '../components/NewsList';
import { FETCH_ITEMS_STATUS } from '../redux/slices/news/types';

const News: FC = () => {
  const [{ startFrom }, { setParams }] = useUrlParams({
    initialParams: {
      [URL_PAGINATION_PARAMS.startFrom]: DEFAULT_PAGINATION_START_FROM,
    },
    isReplace: true,
  });
  const dispatch = useAppDispatch();
  const status = useAppSelector(getFetchNewsStatus);
  const { t } = useTranslation();

  const getNews = useCallback(() => {
    dispatch(
      fetchNews({
        startFrom,
      }),
    );
  }, [startFrom, dispatch]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(
    () => () => {
      dispatch(clearItemList());
    },
    [dispatch],
  );

  const handlePaginate = () => {
    const newStartFrom = Number(startFrom) + Number(+DEFAULT_PAGINATION_LIMIT);
    if (newStartFrom || newStartFrom === 0) {
      setParams(URL_PAGINATION_PARAMS.startFrom, newStartFrom.toString());
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      {status === FETCH_ITEMS_STATUS.ERROR ? <span>Error</span> : <NewsList />}
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 4 }}
      >
        <Button
          variant='contained'
          onClick={handlePaginate}
          disabled={status === FETCH_ITEMS_STATUS.LOADING}
        >
          {t('newsPage.paginateButton')}
        </Button>
      </Box>
    </Box>
  );
};

export default News;
