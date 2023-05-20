/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { State, TNestedObjs, Workspace } from '../models';

const initialState: Workspace = {
  docsPanelVisible: false,
  docsFetched: true,
  nestedObjsArr: [],
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    docsClick: (state) => {
      state.docsPanelVisible = !state.docsPanelVisible;
    },
    addNestedObj: (state, action: PayloadAction<TNestedObjs>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      state.nestedObjsArr.push(action.payload);
    },
    removeLastNestedObj: (state) => {
      const newNestedObjsArr = [...state.nestedObjsArr];
      newNestedObjsArr.splice(state.nestedObjsArr.length - 1, 1);
      state.nestedObjsArr = newNestedObjsArr;
    },
  },
});

export const { docsClick, addNestedObj, removeLastNestedObj } = workspaceSlice.actions;

export const docsPanelVisible = (state: State) => state.workspace.docsPanelVisible;
export const docsFetched = (state: State) => state.workspace.docsFetched;
export const nestedObjsArr = (state: State) => state.workspace.nestedObjsArr;

export default workspaceSlice.reducer;
