import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import { WrapperApp } from '../styled/Wrappers';

const Layout: FC = () => {
  return (
    <>
      <CssBaseline />
      <WrapperApp component='section'>
        <Header />
        <Container maxWidth='xl' component='main'>
          <Outlet />
        </Container>
      </WrapperApp>
    </>
  );
};

export default Layout;
