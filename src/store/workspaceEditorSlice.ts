/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface EditorTab {
  editorTabId: number;
  editorTabText: string;
}

interface WorkspaceEditor {
  variablesActive: boolean;
  headersActive: boolean;
  variablesEditorText: string;
  headersEditorText: string;
  toolsCodemirrorVisible: boolean;
  newEditorTabId: number;
  currentEditorTabId: number;
  editorTabs: EditorTab[];
}

interface State {
  workspaceEditor: WorkspaceEditor;
}

const firstEditorTabId = 1;
const firsteditorTabText = "# console.log('hello world!');";

const initialState: WorkspaceEditor = {
  variablesActive: true,
  headersActive: false,
  variablesEditorText: '',
  headersEditorText: '',
  toolsCodemirrorVisible: false,
  newEditorTabId: firstEditorTabId,
  currentEditorTabId: firstEditorTabId,
  editorTabs: [{ editorTabId: firstEditorTabId, editorTabText: firsteditorTabText }],
};

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
      if (state.variablesActive) {
        state.variablesEditorText = action.payload;
      }
      if (state.headersActive) {
        state.headersEditorText = action.payload;
      }
    },
    addClick: (state) => {
      state.newEditorTabId += 1;
      state.currentEditorTabId = state.newEditorTabId;
      state.editorTabs = [
        { editorTabId: state.newEditorTabId, editorTabText: '' },
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
      const findedIndex = state.editorTabs.findIndex(
        (editorTab) => editorTab.editorTabId === state.currentEditorTabId
      );
      state.editorTabs[findedIndex].editorTabText = action.payload;
    },
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
  // eslint-disable-next-line implicit-arrow-linebreak
  state.workspaceEditor.toolsCodemirrorVisible;
export const toolsCodemirrorText = (state: State) => {
  if (state.workspaceEditor.variablesActive) {
    return state.workspaceEditor.variablesEditorText;
  }
  if (state.workspaceEditor.headersActive) {
    return state.workspaceEditor.headersEditorText;
  }
  return '';
};
export const currentEditorTabId = (state: State) => state.workspaceEditor.currentEditorTabId;
export const editorTabs = (state: State) => state.workspaceEditor.editorTabs;
export const editorCodemirrorText = (state: State) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state.workspaceEditor.editorTabs.find(
    (editorTab) => editorTab.editorTabId === state.workspaceEditor.currentEditorTabId
  )?.editorTabText;

export default workspaceEditorSlice.reducer;
