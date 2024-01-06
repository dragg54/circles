import { createSlice } from "@reduxjs/toolkit";
import {  UserAuth } from "../types/User";
import jwt_decode from 'jwt-decode';
import { CommunityType } from "../types/Community";

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: "", user:null},
    reducers: {
      fetchAuth: (state, action: {payload: {token: string}}) =>{
        const user = jwt_decode(action.payload.token)
        state.token = action.payload.token
        state.user = user
        return (state as UserAuth)
      },

      clearAuth:()=>{
        return {token: "", user:null}
      },

      joinCommunity:(state, action:{payload:{community: CommunityType}}) =>{
        return {...state, user: {...state.user, communities: [...state.user.communities, action.payload.community]}}
      },
  
      leaveCommunity:(state, action:{payload:{community: CommunityType}}) =>{
        console.log(action.payload.community)
        const commIdx = state.user.communities.findIndex((comm:CommunityType)=> comm.communityName == action.payload.community.communityName)
        state.user.communities.splice(commIdx, 1)
        return state
      }
    },
  });
  
  export const { fetchAuth, clearAuth, leaveCommunity, joinCommunity } = authSlice.actions;
  export default authSlice.reducer;