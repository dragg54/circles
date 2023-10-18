import { createSlice } from "@reduxjs/toolkit";
import {  UserAuth } from "../types/User";
import jwt_decode from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: {id:"", token: "", user:null},
    reducers: {
      fetchAuth: (state, action: {payload: {token: string}}) =>{
        const user = jwt_decode(action.payload.token)
        state.token = action.payload.token
        state.user = user
        return (state as UserAuth)
      }
    },
  });
  
  export const { fetchAuth } = authSlice.actions;
  export default authSlice.reducer;