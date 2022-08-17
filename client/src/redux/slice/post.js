import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPostData = createAsyncThunk('get/fetchPostData', async () => {
  const { data } = await axios.get('/notes/get');
  return data;
});

export const fetchAddPost = createAsyncThunk('post/fetchAddPost', async (params) => {
  const { data } = await axios.post('/notes', params);
  return data;
});

export const fetchDeletePost = createAsyncThunk('post/fetchDeletePost', async (params) => {
  const { data } = await axios.delete(`/notes/${params}`);
  return data;
});

const initialState = {
  post: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    //get post
    [fetchPostData.pending]: (state) => {
      state.post.status = 'loading';
    },
    [fetchPostData.fulfilled]: (state, action) => {
      state.post.items = action.payload;
      state.status = 'loaded';
    },
    [fetchPostData.rejected]: (state) => {
      state.post.items = [];
      state.post.status = 'error';
    },

    //delete

    [fetchDeletePost.pending]: (state, action) => {
      state.post.items = state.post.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export default postSlice.reducer;
