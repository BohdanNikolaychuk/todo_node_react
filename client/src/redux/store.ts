import { configureStore } from '@reduxjs/toolkit';
import auth from './Auth/slice';
import tasks from './Todo/slice';
const store = configureStore({
  reducer: {
    auth,
    tasks,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
