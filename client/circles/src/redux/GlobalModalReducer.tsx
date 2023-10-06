import { createSlice } from '@reduxjs/toolkit';

const globalModalReducer = createSlice({
    name: 'globalModal',
    initialState: {formName: '', isOpened: false},
    reducers: {
      isOpened: (state, action: {payload: {formName: string}}): {formName: string, isOpened: boolean} => {
        return {formName:action.payload.formName, isOpened: true};
      },
      isClosed: (state, action: {payload:{ formName: string} }): {formName: string, isOpened: boolean} => {
        return {formName:action.payload.formName, isOpened: false};
      }
    },
  });
  
  export const { isOpened, isClosed } = globalModalReducer.actions;
  export default globalModalReducer.reducer;