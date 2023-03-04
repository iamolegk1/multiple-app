import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';

import { useAppDispatch } from '../../redux/hooks';
import { addUser } from '../../redux/slices/user';
import {
  USERNAME_VALIDATION,
  PASSWORD_VALIDATION,
  ROUTES,
} from '../../constants';
import { ILoginForm } from './types';

const LoginForm = () => {
  const [formValue, setFormValue] = useState<ILoginForm>({
    username: '',
    password: '',
  });
  const [errorField, setErrorField] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if the stack was not limited, i would use yup
    if (
      USERNAME_VALIDATION === formValue.username &&
      PASSWORD_VALIDATION === formValue.password
    ) {
      dispatch(
        addUser({
          username: formValue.username,
          password: formValue.password,
        }),
      );
      setErrorField(false);
      setFormValue({
        username: '',
        password: '',
      });
      navigate(`${ROUTES.home}${ROUTES.profile}`);
    } else {
      setErrorField(true);
    }
  };

  const onUpdateField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('loginPage.titleForm')}
        </Typography>
        <Box component='form' onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
          <TextField
            id='username'
            name='username'
            value={formValue.username}
            onChange={onUpdateField}
            type='text'
            label={t('loginPage.usernameForm')}
            autoFocus
            error={errorField}
            margin='normal'
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            value={formValue.password}
            onChange={onUpdateField}
            type='password'
            label={t('loginPage.passwordForm')}
            error={errorField}
            margin='normal'
            fullWidth
          />
          <FormHelperText error={errorField} hidden={!errorField}>
            {t('loginPage.validationTextForm')}
          </FormHelperText>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('loginPage.submitButtonForm')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
