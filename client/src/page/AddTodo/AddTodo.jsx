import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { fetchAddPost } from '../../redux/slice/post';

import { useForm } from 'react-hook-form';

const AddTodo = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      text: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    const aValue = localStorage.getItem('token');
    dispatch(fetchAddPost(values, aValue));
  };

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Paper>
          <Typography variant="h5">Add Post</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ mb: 2 }}
              label="Text"
              error={Boolean(errors.text?.message)}
              helperText={errors.text?.message}
              {...register('text', { required: 'Enter text' })}
              fullWidth
            />

            <Button
              sx={{ mt: 2, mb: 2 }}
              disabled={!isValid}
              type="submit"
              size="large"
              variant="contained"
              fullWidth>
              Add post
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddTodo;
