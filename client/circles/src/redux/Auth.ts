import { createSlice } from "@reduxjs/toolkit";
import {  UserAuth } from "../types/User";
import jwt_decode from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: {userName: "", profilePicture: "", token: ""},
    reducers: {
      fetchAuth: (_, action: {payload: {token: string}}) =>{
        const user = jwt_decode(action.payload.token)
        return (user as UserAuth)
      }
    },
  });
  
  export const { fetchAuth } = authSlice.actions;
  export default authSlice.reducer;