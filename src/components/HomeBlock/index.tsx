import { FC } from 'react';

import Box from '@mui/material/Box';

import { DEFAULT_TEXT } from './constants';
import { Title } from '../../styled/Title';

const HomeBlock: FC = () => {
  return (
    <Box component='main' sx={{ p: 5 }}>
      <Title>{DEFAULT_TEXT}</Title>
    </Box>
  );
};

export default HomeBlock;
