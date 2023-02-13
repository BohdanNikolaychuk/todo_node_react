import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITasks } from '../../@types/ITasks.interface';
import { fetchTasks } from './asyncAction';

interface State {
  tasks: ITasks[];
  status: string;
  error: string;
}

const initialState: State = {
  tasks: [],
  status: '',
  error: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITasks>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task: ITasks) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = 'loaded';
    });

    builder.addCase(fetchTasks.rejected, (state) => {
      state.tasks = [];
      state.error = 'error';
    });
  },
});

export const { addTask, removeTask } = postSlice.actions;

export default postSlice.reducer;
