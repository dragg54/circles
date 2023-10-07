import { createSlice } from '@reduxjs/toolkit';

const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState: {formName: '', isOpened: false},
    reducers: {
      isOpened: (_, action: {payload: {formName: string}}): {formName: string, isOpened: boolean} => {
        return {formName:action.payload.formName, isOpened: true};
      },
      isClosed: (_, action: {payload:{ formName: string} }): {formName: string, isOpened: boolean} => {
        return {formName:action.payload.formName, isOpened: false};
      }
    },
  });
  
  export const { isOpened, isClosed } = globalModalSlice.actions;
  export default globalModalSlice.reducer;