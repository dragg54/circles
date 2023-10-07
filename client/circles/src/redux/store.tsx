import { configureStore } from '@reduxjs/toolkit';
import GlobalModalSlice from './GlobalModal';
import AuthSlice from './Auth';
import PostSlice from './Post'

const store = configureStore({
  reducer: {
    globalModal: GlobalModalSlice,
    auth: AuthSlice,
    post: PostSlice
  }, devTools: true
});

export default store;
