import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { ReactComponent as IconUA } from '../../assets/img/ukraine.svg';
import { ReactComponent as IconGB } from '../../assets/img/unitedkingdom.svg';

import { useAppSelector } from '../../redux/hooks';
import { getUserName } from '../../redux/slices/user/selectors';
import { ROUTES, USERNAME_VALIDATION } from '../../constants';
import { NavButtonSX } from '../../styled/Button';

const Header: FC = () => {
  const username = useAppSelector(getUserName);
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack
            direction='row'
            spacing={1}
            divider={<Divider orientation='vertical' flexItem />}
          >
            <IconButton
              aria-label='ua'
              key='ua'
              type='submit'
              onClick={() => i18n.changeLanguage('ua')}
            >
              <IconUA />
            </IconButton>
            <IconButton
              aria-label='en'
              key='en'
              type='submit'
              onClick={() => i18n.changeLanguage('en')}
            >
              <IconGB />
            </IconButton>
          </Stack>
          <ButtonGroup variant='contained'>
            <Button to={ROUTES.home} component={NavLink} sx={NavButtonSX}>
              {t('homePage.homeNavButton')}
            </Button>
            <Button to={ROUTES.news} component={NavLink} sx={NavButtonSX}>
              {t('homePage.newsNavButton')}
            </Button>
            {username === USERNAME_VALIDATION ? (
              <Button to={ROUTES.profile} component={NavLink} sx={NavButtonSX}>
                {t('homePage.profileNavButton')}
              </Button>
            ) : (
              <Button to={ROUTES.login} component={NavLink} sx={NavButtonSX}>
                {t('homePage.loginNavButton')}
              </Button>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
