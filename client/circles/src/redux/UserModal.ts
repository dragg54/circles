import { createSlice } from '@reduxjs/toolkit';

const userModalSlice = createSlice({
    name: 'userModal',
    initialState: false,
    reducers: {
      openUserModal:()=>{
        return true
      },
      closeUserModal:()=>{
        return false
      }
    }
  });
  
  export const { openUserModal, closeUserModal } = userModalSlice.actions;
  export default userModalSlice.reducer;