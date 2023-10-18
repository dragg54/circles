import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/User';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        profilePicture: "",
        communities: [],
        following: [],
        followers: []
    },
    reducers: {
     getUser:(state, action:{payload :{ user: IUser}})=>{
        return action.payload.user
     }
    }
  });
  
  export const { getUser } = userSlice.actions;
  export default userSlice;