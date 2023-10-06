import { configureStore } from '@reduxjs/toolkit';
import GlobalModalReducer from './GlobalModalReducer';

const store = configureStore({
  reducer: {
    globalModal: GlobalModalReducer,
  },
});

export default store;
