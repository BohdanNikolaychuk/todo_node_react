import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthMe, loginUser, registerUser } from './asyncActions';
import { State } from './types';

const initialState: State = {
  isAuth: null,
  user: null,
  token: null,
  loading: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.isAuth = null;
      state.loading = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUser.pending, (state) => {});

    builder.addCase(registerUser.fulfilled, (state) => {});

    builder.addCase(registerUser.rejected, (state) => {});
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = null;
      state.error = action.payload as string;
    });

    //Me
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAuth = null;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
