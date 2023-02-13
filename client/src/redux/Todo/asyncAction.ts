import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { addTask, removeTask } from './slice';

export const fetchTasks = createAsyncThunk('get/fetchTasks', async () => {
  try {
    const { data } = await axios.get('/notes/get');
    return data;
  } catch (error) {}
});

export const fetchAddTask = createAsyncThunk(
  'post/fetchAddPost',
  async (params: { aValue: string | null; text: string }, { dispatch }) => {
    try {
      const { data } = await axios.post('/notes', params);

      dispatch(addTask(data));
      return data;
    } catch (error) {}
  },
);

export const fetchDeleteTask = createAsyncThunk(
  'post/fetchAddPost',
  async (id: string, { dispatch }) => {
    try {
      const { data } = await axios.delete(`/notes/${id}`);

      if (data.message === 'Success') {
        dispatch(removeTask(id));
      }
      return data;
    } catch (error) {}
  },
);

export const fetchUpdateTask = createAsyncThunk(
  'task/fetchUdateTask',
  async (props: { _id: string; text: string }) => {
    const { _id, text } = props;

    try {
      const { data } = await axios.put(`/notes/${_id}`, { text });
      return data;
    } catch (error) {}
  },
);

export const fetchUpdateStatus = createAsyncThunk('task/fetchUdateStatus', async (id: string) => {
  try {
    const data = await axios.patch(`/notes/${id}`);
    console.log(data);
  } catch (error) {}
});
