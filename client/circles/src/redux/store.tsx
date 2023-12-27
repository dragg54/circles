import { combineReducers, configureStore } from '@reduxjs/toolkit';
import GlobalModalSlice from './GlobalModal';
import AuthSlice from './Auth';
import PostSlice from './Post'
import UserSlice from './UserModal'
import ResponseModalSlice from './ResponseModal';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: "root",
  storage,
  blacklist: ['post', 'responseModal', 'userModal', 'globalModal']

}

const rootReducer = combineReducers({
  formModal: GlobalModalSlice,
  auth: AuthSlice,
  post: PostSlice,
  userModal: UserSlice,
  responseModal: ResponseModalSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer, devTools: true,  middleware: [thunk]

});

export const persistor = persistStore(store)

export default store;
