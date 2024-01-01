import { createSlice } from "@reduxjs/toolkit";
import {  UserAuth } from "../types/User";
import jwt_decode from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: "", user:null},
    reducers: {
      fetchAuth: (state, action: {payload: {token: string}}) =>{
        const user = jwt_decode(action.payload.token)
        console.log("user", user)
        state.token = action.payload.token
        state.user = user
        return (state as UserAuth)
      },
      clearAuth:()=>{
        return {token: "", user:null}
      }
    },
  });
  
  export const { fetchAuth, clearAuth } = authSlice.actions;
  export default authSlice.reducer;