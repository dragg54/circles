import { createSlice } from '@reduxjs/toolkit';
import { FormTypes } from '../types/Form';
import { IPost } from '../types/IPost';

const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState: {formName: FormTypes.createForm, isOpened: false, parent: null},
    reducers: {
      isOpened: (_, action: {payload: {formName: FormTypes, parent: null | IPost}}): {formName: FormTypes, isOpened: boolean, parent: null | IPost} => {
        return {formName:action.payload.formName, isOpened: true, parent: action.payload.parent};
      },
      isClosed: (_, action: {payload:{ formName: FormTypes, parent: null | IPost} }): {formName: FormTypes, isOpened: boolean, parent: null | IPost} => {
        return {formName:action.payload.formName, isOpened: false, parent: action.payload.parent};
      }
    },
  });
  
  export const { isOpened, isClosed } = globalModalSlice.actions;
  export default globalModalSlice.reducer;