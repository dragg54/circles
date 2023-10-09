import { combineReducers, configureStore } from '@reduxjs/toolkit';
import GlobalModalSlice from './GlobalModal';
import AuthSlice from './Auth';
import PostSlice from './Post'
import UserSlice from './UserModal'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';


const store = configureStore({
  reducer: {
    globalModal: GlobalModalSlice,
    auth: AuthSlice,
    post: PostSlice,
    userModal: UserSlice
  }, devTools: true
});

const persistConfig = {
  key: "root",
  storage
}

const reducer = combineReducers({

})

export default store;
