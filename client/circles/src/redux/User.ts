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
    getUser: (state, action: { payload: { user: IUser } }) => {
      return action.payload.user
    },

    follow: (state, action: { payload: { userId: string } }) => {
      const userId = action.payload
      const follIdx = state.following.findIndex(fol => fol == userId)
      if (state.following.includes(userId)) {
        state.following.splice(follIdx, 1)
        return state
      }
      else {
        state.following.push(userId)
        return state
      }
    },

    clearUser: () => {
      return {
        userName: "",
        profilePicture: "",
        communities: [],
        following: [],
        followers: []
      }
    },
   
  }
});

export const { getUser, clearUser, follow } = userSlice.actions;
export default userSlice;