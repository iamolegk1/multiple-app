import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

export const WrapperApp = styled(Box)`
  width: 100%;
  margin: 0 auto;
`;

export const CenteredBlock = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -100px;
`;

export const ListWrapper = styled(List)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
