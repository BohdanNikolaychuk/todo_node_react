import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/auth';
import postReducer from './slice/post';
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
