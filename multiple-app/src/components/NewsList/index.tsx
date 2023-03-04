import { FC } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getNewsItems,
  getDeleteItemNewsStatus,
  getDeleteErrorText,
} from '../../redux/slices/news/selectors';
import { clearItemDeleteStatus } from '../../redux/slices/news';
import { DELETE_ITEM_STATUS, INewsItem } from '../../redux/slices/news/types';
import { deleteNews } from '../../redux/api';
import TemporaryComponent from '../TemporaryComponent';
import { ListWrapper } from '../../styled/Wrappers';

const NewsList: FC = () => {
  const dispatch = useAppDispatch();
  const newsList = useAppSelector(getNewsItems);
  const deleteStatus = useAppSelector(getDeleteItemNewsStatus);
  const errorText = useAppSelector(getDeleteErrorText);

  const handleDelete = (id: number) => {
    dispatch(deleteNews(id));
  };

  const handleShowAlert = () => {
    dispatch(clearItemDeleteStatus());
  };

  return (
    <ListWrapper>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {deleteStatus === DELETE_ITEM_STATUS.FAILED && (
          <Alert severity='error' onClose={() => handleShowAlert()}>
            {errorText}
          </Alert>
        )}
        {deleteStatus === DELETE_ITEM_STATUS.SUCCEEDED && (
          <TemporaryComponent delayTime={2500} callback={handleShowAlert}>
            <Alert severity='success' onClose={() => handleShowAlert()}>
              News successfully removed!
            </Alert>
          </TemporaryComponent>
        )}
      </Stack>
      {newsList.map((news: INewsItem) => (
        <ListItem
          key={news.id}
          secondaryAction={
            <IconButton
              disabled={deleteStatus === DELETE_ITEM_STATUS.PENDING}
              onClick={() => handleDelete(news.id)}
              edge='end'
              aria-label='delete'
              size='large'
            >
              <DeleteIcon sx={{ fontSize: 30 }} color='action' />
            </IconButton>
          }
        >
          <ListItemText
            sx={{ mr: '40px' }}
            primary={news.title}
            secondary={news.body}
          />
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default NewsList;
