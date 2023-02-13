import axios from '../../utils/axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '../../@types/IAuth.interface';
import { logout } from './slice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`register`, { username, password });
    } catch (err: any) {
      let error = err;
      if (!error.response) {
        throw err;
      }

      throw rejectWithValue(error.response.data.result);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: ILogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`login`, { username, password });
      localStorage.setItem('userToken', data.jwt_token);

      return data;
    } catch (err: any) {
      let error = err;

      if (error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      }
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, { dispatch }) => {
  try {
    const { data } = await axios.get('/me');

    return data;
  } catch (err: any) {
    let error = err;

    if (error.response.data.message) {
      dispatch(logout());
      localStorage.clear();
    }
  }
});
