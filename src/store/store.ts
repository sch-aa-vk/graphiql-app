import { combineReducers, configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './workspaceSlice';
import workspaceEditorReducer from './workspaceEditorSlice';

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  workspaceEditor: workspaceEditorReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
