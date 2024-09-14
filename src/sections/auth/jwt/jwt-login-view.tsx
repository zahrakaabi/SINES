'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// UI Lib Components
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

// Local Components
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IUserItem } from 'src/types/user';

/* -------------------------------------------------------------------------- */
/*                               JWT LOGIN VIEW                               */
/* -------------------------------------------------------------------------- */
function JwtLoginView() {
/* ---------------------------------- HOOKS --------------------------------- */
  const { login } = useAuthContext();
  const router = useRouter();
  const [users, setUsers] = useState<IUserItem[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

/* -------------------------------- CONSTANTS ------------------------------- */
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('UserName is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const authenticateUser = async (username: string, password: string) => {
    try {
      await login?.(username, password);
      const response = await axios.get(endpoints.user.list);
      const users: IUserItem[] = response.data;
      return users.some(user => user.username === username && user.password === password);
    } catch (error) {
      console.error("Error during authentication or fetching users: ", error);
      throw error;
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const { username, password } = data;
    try {
      const isAuthenticated = await authenticateUser(username, password);
      if (isAuthenticated) {
        router.push(returnTo || PATH_AFTER_LOGIN);
      } else {
        setErrorMsg('Authentication failed. Please check your username and password.');
        reset();
      }
    } catch (error) {
      reset();
      setErrorMsg('Authentication failed. Please check your username and password.');
    }
  });

/* ---------------------- RENDER HEAD HYBRID COMPONENT ---------------------- */
  const renderHead = <Typography sx={{ mb: 2 }} variant="h4"> Sign in to SINES </Typography>;

/* ---------------------- RENDER FORM HYBRID COMPONENT ---------------------- */
  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="username" label="Username" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use username : <strong> admin </strong> / password :<strong> admin </strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
};

export default JwtLoginView;