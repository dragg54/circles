import { createSlice } from '@reduxjs/toolkit';

const ResponseModalSlice = createSlice({
    name: 'responseModal',
    initialState: {msg: '', openResponseModal: false},
    reducers: {
      openResponseModal: (_, action: {payload: {msg: string}}): {msg: string, openResponseModal: boolean} => {
        return {msg:action.payload.msg, openResponseModal: true};
      },
      closeResponseModal: (_, action: {payload:{ msg: string} }): {msg: string, openResponseModal: boolean} => {
        return {msg:action.payload.msg, openResponseModal: false};
      }
    },
  });
  
  export const { openResponseModal, closeResponseModal } = ResponseModalSlice.actions;
  export default ResponseModalSlice.reducer;