import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { fetchRegister, isAuth } from '../../redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
const Registration = () => {
  const dispatch = useDispatch();
  const isAuthSelect = useSelector(isAuth);
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

  const onSubmit = (values) => {
    try {
      const data = dispatch(fetchRegister(values));

      if (!data.payload.jwt_token) {
        alert('Failed to register');
      }
      if ('jwt_token' in data.payload) {
        window.localStorage.setItem('token', data.payload.jwt_token);
      }
    } catch (error) {
      alert('This username address is already used');
    }
  };

  if (isAuthSelect) {
    return <Navigate to="/" />;
  }
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Paper>
        <Typography sx={{ m: 2 }} variant="h5">
          Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mt: 2, mb: 2 }}
            label="Username"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register('username', { required: 'Enter username' })}
            fullWidth
          />

          <TextField
            sx={{ mt: 2, mb: 2 }}
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter password]' })}
            fullWidth
          />
          <Button
            sx={{ mt: 2, mb: 2 }}
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth>
            Sing Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Registration;
