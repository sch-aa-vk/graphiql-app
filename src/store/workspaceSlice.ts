/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { State, Workspace } from '../models';

const initialState: Workspace = {
  docsPanelVisible: false,
  docsFetched: false,
  nestedObjsArr: [],
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    docsClick: (state) => {
      state.docsPanelVisible = !state.docsPanelVisible;
    },
    fetchDocs: (state, action: PayloadAction<boolean>) => {
      state.docsFetched = action.payload;
    },
    addNestedObj: (state, action: PayloadAction<string[]>) => {
      state.nestedObjsArr.push(action.payload);
    },
    removeLastNestedObj: (state) => {
      const newNestedObjsArr = [...state.nestedObjsArr];
      newNestedObjsArr.splice(newNestedObjsArr.length - 1, 1);
      state.nestedObjsArr = newNestedObjsArr;
    },
  },
});

export const { docsClick, fetchDocs, addNestedObj, removeLastNestedObj } = workspaceSlice.actions;

export const docsPanelVisible = (state: State) => state.workspace.docsPanelVisible;
export const docsFetched = (state: State) => state.workspace.docsFetched;
export const nestedObjsArr = (state: State) => state.workspace.nestedObjsArr;

export default workspaceSlice.reducer;
