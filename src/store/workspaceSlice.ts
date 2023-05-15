/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface Workspace {
  docsPanelVisible: boolean;
  docsFetched: boolean;
}

interface State {
  workspace: Workspace;
}

const initialState: Workspace = {
  docsPanelVisible: false,
  docsFetched: true,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    docsClick: (state) => {
      state.docsPanelVisible = !state.docsPanelVisible;
    },
  },
});

export const { docsClick } = workspaceSlice.actions;

export const docsPanelVisible = (state: State) => state.workspace.docsPanelVisible;
export const docsFetched = (state: State) => state.workspace.docsFetched;

export default workspaceSlice.reducer;
