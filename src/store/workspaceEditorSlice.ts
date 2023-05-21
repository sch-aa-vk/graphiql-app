/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { countriesApi } from './countriesApiSlice';

interface EditorTab {
  editorTabId: number;
  editorTabText: string;
  variablesTabText: string;
  headersTabText: string;
  responseTabText: string;
}

interface WorkspaceEditor {
  variablesActive: boolean;
  headersActive: boolean;
  toolsCodemirrorVisible: boolean;
  newEditorTabId: number;
  currentEditorTabId: number;
  editorTabs: EditorTab[];
}

interface State {
  workspaceEditor: WorkspaceEditor;
}

const firstEditorTabId = 1;

const initialState: WorkspaceEditor = {
  variablesActive: true,
  headersActive: false,
  toolsCodemirrorVisible: false,
  newEditorTabId: firstEditorTabId,
  currentEditorTabId: firstEditorTabId,
  editorTabs: [
    {
      editorTabId: firstEditorTabId,
      editorTabText: '',
      variablesTabText: '',
      headersTabText: '',
      responseTabText: '',
    },
  ],
};

const findCurrentTabIndex = (state: WorkspaceEditor) =>
  state.editorTabs.findIndex((editorTab) => editorTab.editorTabId === state.currentEditorTabId);

const findCurrentTab = (state: State) =>
  state.workspaceEditor.editorTabs.find(
    (editorTab) => editorTab.editorTabId === state.workspaceEditor.currentEditorTabId
  );

const workspaceEditorSlice = createSlice({
  name: 'workspaceEditor',
  initialState,
  reducers: {
    variablesClick: (state) => {
      state.variablesActive = true;
      state.headersActive = false;
    },
    headersClick: (state) => {
      state.variablesActive = false;
      state.headersActive = true;
    },
    togglerClick: (state) => {
      state.toolsCodemirrorVisible = !state.toolsCodemirrorVisible;
    },
    toolsCodemirrorChange: (state, action) => {
      const findedIndex = findCurrentTabIndex(state);
      if (state.variablesActive) {
        state.editorTabs[findedIndex].variablesTabText = action.payload;
      }
      if (state.headersActive) {
        state.editorTabs[findedIndex].headersTabText = action.payload;
      }
    },
    addClick: (state) => {
      state.newEditorTabId += 1;
      state.currentEditorTabId = state.newEditorTabId;
      state.editorTabs = [
        {
          editorTabId: state.newEditorTabId,
          editorTabText: '',
          variablesTabText: '',
          headersTabText: '',
          responseTabText: '',
        },
        ...state.editorTabs,
      ];
    },
    editorTabSelect: (state, action) => {
      state.currentEditorTabId = action.payload;
    },
    editorTabClose: (state, action) => {
      if (state.editorTabs.length === 1) {
        return;
      }
      const findedIndex = state.editorTabs.findIndex(
        (editorTab) => editorTab.editorTabId === action.payload
      );
      if (state.currentEditorTabId === state.editorTabs[findedIndex].editorTabId) {
        if (findedIndex === 0) {
          state.currentEditorTabId = state.editorTabs[findedIndex + 1].editorTabId;
        } else {
          state.currentEditorTabId = state.editorTabs[findedIndex - 1].editorTabId;
        }
      }
      state.editorTabs.splice(findedIndex, 1);
    },
    editorCodemirrorChange: (state, action) => {
      const findedIndex = findCurrentTabIndex(state);
      state.editorTabs[findedIndex].editorTabText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(countriesApi.endpoints.sendRequest.matchRejected, (state, action) => {
        const findedIndex = findCurrentTabIndex(state);
        if (action.payload?.data) {
          state.editorTabs[findedIndex].responseTabText = JSON.stringify(
            action.payload?.data,
            null,
            2
          );
        } else if ('error' in action && 'message' in action.error) {
          state.editorTabs[findedIndex].responseTabText = action.error.message as string;
        } else {
          state.editorTabs[findedIndex].responseTabText = '';
        }
      })
      .addMatcher(countriesApi.endpoints.sendRequest.matchFulfilled, (state, action) => {
        const findedIndex = findCurrentTabIndex(state);
        state.editorTabs[findedIndex].responseTabText = JSON.stringify(action.payload, null, 2);
      });
  },
});

export const {
  variablesClick,
  headersClick,
  togglerClick,
  toolsCodemirrorChange,
  addClick,
  editorTabSelect,
  editorTabClose,
  editorCodemirrorChange,
} = workspaceEditorSlice.actions;

export const variablesActive = (state: State) => state.workspaceEditor.variablesActive;

export const headersActive = (state: State) => state.workspaceEditor.headersActive;

export const toolsCodemirrorVisible = (state: State) =>
  state.workspaceEditor.toolsCodemirrorVisible;

export const currentEditorTabId = (state: State) => state.workspaceEditor.currentEditorTabId;

export const editorTabs = (state: State) => state.workspaceEditor.editorTabs;

export const editorCodemirrorText = (state: State) => findCurrentTab(state)?.editorTabText;

export const variablesText = (state: State) => findCurrentTab(state)?.variablesTabText;

export const headersText = (state: State) => findCurrentTab(state)?.headersTabText;

export const toolsCodemirrorText = (state: State) => {
  if (state.workspaceEditor.variablesActive) {
    return variablesText(state);
  }
  if (state.workspaceEditor.headersActive) {
    return headersText(state);
  }
  return '';
};

export const responseCodemirrorText = (state: State) => findCurrentTab(state)?.responseTabText;

export default workspaceEditorSlice.reducer;
