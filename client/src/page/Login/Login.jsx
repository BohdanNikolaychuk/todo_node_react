import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { fetchLoginData, isAuth } from '../../redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
const Login = () => {
  const isAuthSelect = useSelector(isAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchLoginData(values));

      if (!data.payload.jwt_token) {
        alert('Failed to login');
      }
      if ('jwt_token' in data.payload) {
        window.localStorage.setItem('token', data.payload.jwt_token);
      }
    } catch (error) {
      alert('Not correct username or password');
    }
  };
  if (isAuthSelect) {
    return <Navigate to="/" />;
  }
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Paper>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mb: 2 }}
            label="Username"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register('username', { required: 'Enter username' })}
            fullWidth
          />
          <TextField
            sx={{ mb: 2 }}
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter password' })}
            fullWidth
          />
          <Button
            sx={{ mt: 2, mb: 2 }}
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth>
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
